#### 참고 자료
    https://github.com/google/google-authenticator/wiki/Key-Uri-Format
    https://github.com/pyauth/pyotp


#### 구현
    1. secret 발행
        서비스가 보관해야 하는 것은 secret이다.
        secret은 간혹 key라고 불린다.
        발행된 secret를 가공해서 아래와 같은 'Key Uri Format'을 만들 수 있다.
        
        otpauth://totp/ServiceName:MemberID?secret=AAAAAAAA11111111C&issuer=ServiceName
        
        "ServiceName(MemberID)"가 OTP 앱에 나타난다.
        secret, issuer가 중요한 내용인데 issuer는 ServiceName과 일치시키면 된다.
        위의 텍스트를 프론트에서 받아서 QR Code로 만들면 사용자가 등록하기 편하다.
        
    2. code 발행
        구글 OTP 앱에서 나오는 6자리 숫자를 Code라고 하고 간혹 토큰이라고도 한다.
    










