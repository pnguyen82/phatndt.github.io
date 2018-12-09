---
title: Secure s3 cloudfont content with Signed Cookies and Signed URLs
categories: aws s3
---
# Serve s3 cloudfront secure conent
Use case:
>Many companies that distribute content over the internet want to restrict access to documents, business data, media streams, or content that is intended for selected users, for example, users who have paid a fee

[Source article from amazon](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html)

You have two options to secure you content
1. Signed URLs
2. Signed Cookies

Choosing between Signed URLs and Signed Cookies [Signed URLs and Signed Cookies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html) 

In this post I just write about signed cookies
## Signed Cookies 
Basically you need to set 3 cookies like below:  
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
### Luckily amazon have libraries for us
- [GO](https://docs.aws.amazon.com/sdk-for-go/api/service/cloudfront/sign/#CookieSigner.Sign)
- [Java](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CFPrivateDistJavaDevelopment.html)
- [Others](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateCFSignatureCodeAndExamples.html)
Example using go library

```go
s := sign.NewCookieSigner(keyID, privKey)

// Get Signed cookies for a resource that will expire in 1 hour
cookies, err := s.Sign("*", time.Now().Add(1 * time.Hour))
if err != nil {
    fmt.Println("failed to create signed cookies", err)
    return
}

// Or get Signed cookies for a resource that will expire in 1 hour
// and set path and domain of cookies
cookies, err := s.Sign("*", time.Now().Add(1 * time.Hour), func(o *sign.CookieOptions) {
    o.Path = "/"
    o.Domain = ".example.com"
})
if err != nil {
    fmt.Println("failed to create signed cookies", err)
    return
}

// Server Response via http.ResponseWriter
for _, c := range cookies {
    http.SetCookie(w, c)
}
```
Where can I get `keyID` and `privKey`?
You can follow this steps: [Creating CloudFront Key Pairs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-creating-cloudfront-key-pairs)
### Deal with domain
Default cloudfront domain look like this: `http://xyz.cloudfront.net`, so you `can not` set cookie for that domain.
If you own the domain `www.yourdomain.com` then you will need to add a `CNAME` to `xyz.cloudfront.net`
So instead of `xyz.cloudfront.net/image1.png` now you can access from `yourdomain.com/image1.png`