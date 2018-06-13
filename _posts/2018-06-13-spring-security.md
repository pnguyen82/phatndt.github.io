---
title: Spring security
layout: default
---
### What is the default authenticationmanager in spring security
The AuthenticationManager is really just a container for authentication providers, giving a consistent interface to them all. In most cases, the default AuthenticationManager is more than sufficient.
When you call
.authenticate(new UsernamePasswordAuthenticationToken(username, password))`
it is passing the UsernamePasswordAuthenticationToken to the default AuthenticationProvider, which will use the userDetailsService to get the user based on username and compare that user's password with the one in the authentication token.
In general, the AuthenticationManager passes some sort of AuthenticationToken to the each of it's AuthenticationProviders and they each inspect it and, if they can use it to authenticate, they return with an indication of "Authenticated", "Unauthenticated", or "Could not authenticate" (which indicates the provider did not know how to handle the token, so it passed on processing it)
This is the mechanism that allows you to plug in other authentication schemes, like authenticating against an LDAP or Active Directory server, or OpenID, and is one of the main extension points within the Spring Security framework.


Spring Security ships only one real AuthenticationManager implementation:
org.springframework.security.authentication.ProviderManager
This uses different AuthenticationProvider for the authentication tasks
The AuthenticationManagerBeanDefinitionParser is responsible to parse <sec:authentication-manager> its java doc states:
Registers the central ProviderManager used by the namespace configuration, and allows the configuration of an alias, allowing users to reference it in their beans and clearly see where the name is coming from.
It creates the ProviderManager and adds the specified provides. If no provides is specified in the xml, then it adds an NullAuthenticationProvider. This is at least a provider that does noting than preventing configuration exceptions.

