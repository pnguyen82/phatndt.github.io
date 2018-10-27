---
title: Secure s3 cloudfont
layout: defaut
---
# Serve s3 secure conent
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-setting-signed-cookie-canned-policy.html
## Step
1. set cookies:The name-value pairs are:
  1.  `CloudFront-Expires`
  2.  `CloudFront-Signature`
  3.  `CloudFront-Key-Pair-Id`
Example:
```
Set-Cookie:
Domain=optional domain name;
Path=/optional directory path;
Secure;
HttpOnly;
CloudFront-Expires=date and time in Unix time format (in seconds) and Coordinated Universal Time (UTC)

Set-Cookie:
Domain=optional domain name;
Path=/optional directory path;
Secure;
HttpOnly;
CloudFront-Signature=hashed and signed version of the policy statement

Set-Cookie:
Domain=optional domain name;
Path=/optional directory path;
Secure;
HttpOnly;
CloudFront-Key-Pair-Id=active CloudFront key pair Id for the key pair that you are using to generate the signature
```
- golang lib:
https://docs.aws.amazon.com/sdk-for-go/api/service/cloudfront/sign/#CookieSigner.Sign
