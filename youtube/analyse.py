import os
import json
from datetime import datetime, timedelta
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/yt-analytics.readonly",
]

CREDENTIALS_FILE = "client_secret.json"
TOKEN_FILE = "token.json"


def get_credentials():
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_FILE, "w") as f:
            f.write(creds.to_json())
    return creds


def get_channel_info(youtube):
    res = youtube.channels().list(part="snippet,statistics", mine=True).execute()
    channel = res["items"][0]
    stats = channel["statistics"]
    print("\n=== CHAÎNE ===")
    print(f"Nom        : {channel['snippet']['title']}")
    print(f"Abonnés    : {int(stats.get('subscriberCount', 0)):,}")
    print(f"Vues total : {int(stats.get('viewCount', 0)):,}")
    print(f"Vidéos     : {stats.get('videoCount', 0)}")
    return channel["id"]


def get_top_videos(youtube, channel_id, max_results=10):
    res = youtube.search().list(
        part="snippet",
        channelId=channel_id,
        order="viewCount",
        type="video",
        maxResults=max_results,
    ).execute()

    video_ids = [item["id"]["videoId"] for item in res["items"]]
    details = youtube.videos().list(
        part="snippet,statistics",
        id=",".join(video_ids),
    ).execute()

    print(f"\n=== TOP {max_results} VIDÉOS ===")
    for v in details["items"]:
        s = v["statistics"]
        title = v["snippet"]["title"][:50]
        views = int(s.get("viewCount", 0))
        likes = int(s.get("likeCount", 0))
        comments = int(s.get("commentCount", 0))
        print(f"{views:>8,} vues | {likes:>5,} likes | {comments:>4,} comments | {title}")


def get_analytics(yt_analytics, channel_id):
    end = datetime.today().strftime("%Y-%m-%d")
    start = (datetime.today() - timedelta(days=28)).strftime("%Y-%m-%d")

    res = yt_analytics.reports().query(
        ids=f"channel=={channel_id}",
        startDate=start,
        endDate=end,
        metrics="views,estimatedMinutesWatched,averageViewDuration,subscribersGained,estimatedRevenue",
        dimensions="day",
        sort="day",
    ).execute()

    total_views = 0
    total_watch = 0
    total_subs = 0
    total_revenue = 0.0

    for row in res.get("rows", []):
        total_views += row[1]
        total_watch += row[2]
        total_subs += row[4]
        total_revenue += row[5]

    print(f"\n=== ANALYTICS 28 DERNIERS JOURS ({start} → {end}) ===")
    print(f"Vues              : {int(total_views):,}")
    print(f"Minutes regardées : {int(total_watch):,}")
    print(f"Abonnés gagnés    : {int(total_subs):,}")
    print(f"Revenus estimés   : ${total_revenue:.2f}")


def main():
    creds = get_credentials()
    youtube = build("youtube", "v3", credentials=creds)
    yt_analytics = build("youtubeAnalytics", "v2", credentials=creds)

    channel_id = get_channel_info(youtube)
    get_top_videos(youtube, channel_id)
    get_analytics(yt_analytics, channel_id)


if __name__ == "__main__":
    main()
