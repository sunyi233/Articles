import boto3
import json
from datetime import datetime, timedelta

_BuyersTable = boto3.resource('dynamodb').Table('Buyers')
_StatisticsTable = boto3.resource('dynamodb').Table('Statistics')

def lambda_handler(event, context):
    for ThisRecord in event['Records']:
        match ThisRecord['eventName']:
            case 'INSERT':
                match ThisRecord['eventSourceARN'].split('/')[1]:
                    case 'Invoices':
                        # set InsertedInvoice
                        InsertedInvoice = ThisRecord['dynamodb']['NewImage']


                   

    return
