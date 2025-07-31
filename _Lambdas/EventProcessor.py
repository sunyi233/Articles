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
                        #print(InsertedInvoice)
                        #{'Site': {'S': '카페31'}, 'BuyerPhone': {'S': '010-2000-2222'}, 'ReturnTrackingNo': {'NULL': True}, 'SellerCode': {'NULL': True}, 'TrackingNumber': {'NULL': True}, 'FirstBuy': {'BOOL': False}, 'ReceiverZip': {'NULL': True}, 'DeliveryNote': {'NULL': True}, 'GoodsCode': {'NULL': True}, 'ReceiverPhone': {'S': '010-2000-1008'}, 'GoodsExtraField': {'NULL': True}, 'MatchingCode': {'S': '1752763456'}, 'BuyerName': {'S': '채선영'}, 'Status': {'S': '없음'}, 'ReceiverAddress': {'S': '서울특별시 관악구 남부순환로 1878 (봉천동, I PLUS 오피스텔) 710호'}, 'OrderCode': {'S': 'ORD0000028'}, 'Quantity': {'N': '1'}, 'AddTime': {'N': '1753871096'}, 'SettledAmount': {'NULL': True}, 'ShippingFee': {'NULL': True}, 'GoodsName': {'S': '11'}, 'PaidAmount': {'N': '60000'}, 'SellerID': {'S': 'rose2019a'}, 'PayTime': {'N': '1753718259'}, 'ReceiverName': {'S': '채선영'}}

                        # statistics
                        PayDay = datetime.fromtimestamp(float(InsertedInvoice['PayTime']['N'])) + timedelta(hours=9)
                        PayDayStatistic = _StatisticsTable.get_item(Key={'YearMonth':PayDay.strftime("%Y-%m"), 'Day':PayDay.strftime("%d")})['Item']

                        match InsertedInvoice['Site']['S']:
                            case '11번가': PayDayStatistic['C_11st'] += 1
                            case 'CJ몰': PayDayStatistic['C_CJMall'] += 1
                            case 'G마켓': PayDayStatistic['C_GMarket'] += 1
                            case '반품': PayDayStatistic['C_Return'] += 1
                            case '샘플': PayDayStatistic['C_Sample'] += 1
                            case '스마트스토어': PayDayStatistic['C_SmartStore'] += 1
                            case '옥션': PayDayStatistic['C_Auction'] += 1
                            case '이벤트증정': PayDayStatistic['C_Event'] += 1
                            case '전화주문': PayDayStatistic['C_Phone'] += 1
                            case '카카오': PayDayStatistic['C_Kakao'] += 1
                            case '카페24': PayDayStatistic['C_MyMall'] += 1
                            case '쿠팡(자동)': PayDayStatistic['C_Coupang'] += 1
                            case '협찬': PayDayStatistic['C_Sponsorship'] += 1
                        PayDayStatistic['C_Sum'] += 1

                        _StatisticsTable.put_item(Item = PayDayStatistic)

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
