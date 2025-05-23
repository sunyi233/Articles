import base64
import boto3
import json
import time
import urllib3
import uuid

DynamoDB = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # check body
    if 'body' not in event: return {'statusCode': 400}
        
    # do things according to headers
    if 'authorization' in event['headers']:
        # 들어온 토큰을 기반으로 새 토큰을 만든다. 이 때 같이 들어온 이메일을 참고한다.
        # 토큰의 time이 0이라면 진행한다. 이 토큰으로 새 토큰을 만들 수 있다는 의미이다. 새 토큰을 만들어서 time을 하나 감소시킨다. -3에 도달하면 멈춘다.
        
        # set things
        Email = event['body']
        
        # check old credential
        DDBResult = DynamoDB.Table('Credentials').get_item(Key = {'AccessToken': event['headers']['authorization'][7:]})
        if 'Item' not in  DDBResult: return {'statusCode': 400}
        
        if DDBResult['Item']['Email'] != Email: return {'statusCode': 400}
        if DDBResult['Item']['IssueTime'] not in [0, -1, -2]: return {'statusCode': 400}
        
        # update credential
        DDBResult['Item']['IssueTime'] -= 1 
        DynamoDB.Table('Credentials').put_item(Item = DDBResult['Item'])
    else:
        # set Email from GoogleAccount using Google issued id token
        try: GoogleAccount = json.loads(urllib3.PoolManager().request('GET', 'https://oauth2.googleapis.com/tokeninfo?id_token=' + event['body']).data) 
        except: return {'statusCode': 500}
            
        if 'error' in GoogleAccount: return {'statusCode': 400}
            
        Email = GoogleAccount['email']
        
        # check if the Email is new
        DDBResult = DynamoDB.Table('Members').get_item(Key = {'Email': Email})
        if 'Item' not in  DDBResult:
            NewMember = {}
            NewMember['Email'] = Email
            NewMember['JoinTime'] = int(time.time())
            DynamoDB.Table('Members').put_item(Item = NewMember)
            
    # set and save AccessToken
    NewCredential = {}
    NewCredential['AccessToken'] = str(base64.b64encode(str(uuid.uuid4()).encode("utf-8")), "utf-8")
    NewCredential['Email'] = Email
    NewCredential['IssueTime'] = int(time.time())
    DynamoDB.Table('Credentials').put_item(Item = NewCredential)
    
    return {'statusCode': 200, 'body': NewCredential['AccessToken']}
