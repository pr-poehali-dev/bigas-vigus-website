import json
import os
import urllib.request
import urllib.parse
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    Получение новостей из группы VK
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }

    access_token = os.environ.get('VK_ACCESS_TOKEN')
    if not access_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'VK_ACCESS_TOKEN not configured'})
        }

    count = event.get('queryStringParameters', {}).get('count', '10')
    
    try:
        params = {
            'domain': 'bigasvirus',
            'count': count,
            'access_token': access_token,
            'v': '5.131'
        }
        
        url = f"https://api.vk.com/method/wall.get?{urllib.parse.urlencode(params)}"
        
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        if 'error' in data:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': data['error']['error_msg']})
            }
        
        posts = []
        for item in data.get('response', {}).get('items', []):
            post_text = item.get('text', '')
            if not post_text:
                continue
            
            title = post_text[:100] + ('...' if len(post_text) > 100 else '')
            
            post_date = datetime.fromtimestamp(item.get('date', 0))
            date_str = post_date.strftime('%d %b %Y')
            month_map = {
                'Jan': 'янв', 'Feb': 'фев', 'Mar': 'мар', 'Apr': 'апр',
                'May': 'май', 'Jun': 'июн', 'Jul': 'июл', 'Aug': 'авг',
                'Sep': 'сен', 'Oct': 'окт', 'Nov': 'ноя', 'Dec': 'дек'
            }
            for eng, rus in month_map.items():
                date_str = date_str.replace(eng, rus)
            
            image_url = None
            attachments = item.get('attachments', [])
            for attachment in attachments:
                if attachment.get('type') == 'photo':
                    sizes = attachment.get('photo', {}).get('sizes', [])
                    if sizes:
                        image_url = sizes[-1].get('url')
                        break
            
            posts.append({
                'id': item.get('id'),
                'title': title,
                'text': post_text,
                'date': date_str,
                'url': f"https://vk.com/bigasvirus?w=wall-{abs(item.get('owner_id', 0))}_{item.get('id', 0)}",
                'likes': item.get('likes', {}).get('count', 0),
                'views': item.get('views', {}).get('count', 0),
                'image': image_url
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'posts': posts})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
