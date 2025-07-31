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


                        # buyers
                        NewBuyer = {}

                        NewBuyer['PhoneNumber'] = InsertedInvoice['BuyerPhone']['S']
                        NewBuyer['Name'] = InsertedInvoice['BuyerName']['S']
                        NewBuyer['Status'] = '없음'
                        NewBuyer['Category'] = []
                        NewBuyer['Type'] = '없음'
                        NewBuyer['LFD'] = NewBuyer['PhoneNumber'].split('-')[2]

                        _BuyersTable.put_item(Item = NewBuyer)

    return
