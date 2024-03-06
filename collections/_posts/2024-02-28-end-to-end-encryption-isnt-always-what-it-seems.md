---
layout: post
title: "End-to-end encryption isn't always what it seems"
citations: true
---

Many people refer to services such as ProtonMail as being "end-to-end encrypted".
I believe this is misleading for numerous reasons, which I'll elaborate on below.

## 1. What _is_ end-to-end encryption?

The _fundamental_ principle of this technology is that, when two or more parties
communicate, they do so via an encrypted channel, where messages can only be read
by the people in that conversation. In this case, those two people are the _ends_
in end-to-end encryption.

In the case of Signal, this is done via the [X3DH protocol][signal-x3dh-protocol].
For fear of annoying any cryptography experts or mathematicians, I'll shy away from
describing how that protocol works in detail. Though, as a summary, techniques such
as [forward secrecy][wikipedia-forward-secrecy] and [encryption][wikipedia-encryption]
are used to ensure that other parties would be unable to decrypt private conversations.

In summary, provided the proper precautions are taken[^0], **the implementation of end-to-end
encryption prevents service providers and third-parties from intercepting private conversations**.

## 2. Email is not, and has never _been_, end-to-end encrypted

On a protocol level, email has never incorporated any kind of end-to-end encryption.
The mail server can read your outgoing and incoming mail in plaintext: this is due
in large part to *limitations* with email protocols, compounded by substantial technical
intertia arising from differing email server implementations.

It's important to note, however, that the communication between your email client
and your mail server _is_ encrypted, along with any communications that server makes
with *other* servers to send and receive mail.  This is typically achieved by TLS.

**This is not end-to-end encryption**, and branding it as such as disingenuous.
In most cases, the term is assumed to mean that the service provider is unable
to see what content passes through it, and email does not prevent that.

It's important to mention that the entire concept of encrypting web communication
is not new -- HTTP over TLS was initially introduced in May 2000, via RFC2818.
Furthermore, TLS 1.0, the initial version, dates back to January 1999 via RFC2246.

## 3. Encryption should be a given

While a substantial amount of improvements have been made to the technology since then
(["post-quantum" encryption][nist-post-quantum-encryption],
[substantially better ciphers][microsoft-tls-1.3], [Encrypted Client Hello][cloudflare-tls-encrypted-client-hello], just to name a few),
the overall concept of encrypting web data is most certainly not a new one.

Therefore, in 99% of cases, **the usage of encryption should be a given**, and certainly
not something to be celebrated or congratulated.  Thanks to its prevalence, it has now
become a basic security measure.

We repeatedly find ourselves in this situation with VPN advertisements[^6], claiming to use "military-grade encryption".
While this _is_ true, the term usually denotes AES256, an algorithm for encrypting data.
Guess what elses uses AES256? HTTPS -- you're using it right now to read this article.

## 4. Encrypting ordinary email is (mostly) impossible

_Because_ of how email works, it is impossible for a provider such as ProtonMail
to automatically provide any form of end-to-end encryption for ordinary email[^2].

To work around this, ProtonMail gives users the option to password-protect their emails.
When enabled, this moves the contents of the sender's email to a webpage which,
when visited by the intended recipient, prompts them for a password.

While I understand that this is the best we can currently achieve without breaking
compatibility with external mail servers, having to open separate links to read an
email will always feel clunky and unintuitive from a UX standpoint.

## 4.1. ...but isn't with _internal_ emails.

In the case of ProtonMail specifically, the only (automatic) implementation of
end-to-end encryption they provide is when email is sent between ProtonMail users.

They're allowed to do this (and it *is* a good thing!) -- while they're not able to
provide end-to-end encryption for _outgoing_ or _incoming_ mails, they _can_
override the behaviour of emails between users of their service[^4].

## 5. The majority of people do not encrypt their emails

Naturally, this brings me onto the next point: while there _are_ extensions to
email which allow for secure communication between two entities (such as [PGP][pgp] or [GPG][gpg]),
most services / people do not use these[^5], in part because the UX of these tools
can be confusing, hard to understand, and difficult to implement.

In the UK at least, I haven't come across one _bank_ that allows you to encrypt
their emails with PGP or GPG. Instead, the majority of banks seem to utilize
secure mailboxes, which you are then prompted to login to via email.

The only large service _I_ can think of which offers end-to-end encrypted emails is
[Facebook][fb-e2ee]; this is good, but it makes me slightly uncomfortable that
one of the only major supporters of secure email is a draconian social network
with a terrible track record for ethics, not to mention their numerous privacy violations.

Therefore, the state of affairs would seem to suggest that, bar a niche subset of
technical users, the industry has generally given up on encrypting email.

## 5. The usage of encryption-at-rest for incoming email

Many encrypted email providers very proudly describe how their systems encrypt the
data "at rest".  **This, again, is not end-to-end encryption.**

Let's consider the following example:

1. Tom (`tom@gmail.com`) sends an email to (`josh@protonmail.com`)
2. Gmail sends the email to ProtonMail's incoming mail server.
3. ProtonMail receives the email from Gmail in plaintext.
4. ProtonMail then encrypts this email with a key.
5. The encrypted copy is stored on the mail server for later retrieval.

While encryption at rest is an excellent technology, the obvious limitation is that
the email still reaches the server in plaintext -- as is the common theme in this post,
there is no way around this.

The plaintext email is, of course, buffered in resident memory before being written to
disk and, as such, any exploits or vulnerabilities in the server have the capability to
expose the plaintext contents of incoming emails.  In the case of ProtonMail specifically,
the issue is compounded by the implementation being entirely closed-source.

Therefore, assuming a provider utilizing encryption at rest were to receive
a subpoena from the state to read a specific user's email, there are no technical
limitations which prevent the surreptitious side-channeling of incoming emails
to an unencrypted storage medium[^8].

## Conclusion

There are plenty of further issues to denote (such as the premise of relying upon
web applications for E2EE) in the first place, although I feel those points are
better-suited for further posts on this overall topic.

I'll close by saying that, as with anything, you should thoroughly research the
systems you use, and understand their shortcomings before you use them.

End-to-end encryption isn't always as it seems, and the industry could certainly
do more to convey that to the end-user.  For mass adoption, encryption needs to
be largely transparent, easy to use, and easy to understand.

---

[^0]: In the case of Signal, a "security number" system allows you to ensure you're communicating with someone, without anyone else standing in the middle; this is done by allowing users to compare a string of numbers on both devices: if they aren't the same on both devices, something's wrong.
[^1]: For the sake of brevity, I've neglected to mention that communication between mail servers is also encrypted. So, in the sake of an email being sent from Yahoo to Gmail, Yahoo would send the email to Gmail's incoming mail server over an encrypted channel. Every mail server does this.
[^2]: The term _"ordinary email"_ here refers to outgoing / incoming mail, where the process of sending or receiving an email involves communicating with a service owned by a separate entity.
[^4]: [ProtonMail has made an informational page explaining this process][protonmail-encryption-explained].
[^5]: While advancements have been made, I still maintain that PGP / GPG encryption is a fairly technical process which requires a fair amount of patience and prior understanding of the technology.  I hope this changes.
[^6]: Tom Scott made an [excellent video on the subject of VPN advertisements][tom-scott-this-video-is-sponsored-by-vpn], which I would definitely recommend watching.  Another recommended read would be joepie91's article: ["Don't use VPN services."][joepie91-dont-use-vpn-services]
[^7]: Once you set up PGP, it would obviously be automatic -- however, the term "automatic" here denotes a feature which requires no prior setup process from the user.  In the case of internal emails, the user does not have to set up key-pairs or understand GPG to utilise the function.
[^8]: To be clear, I am not claiming that any of the providers mentioned employ these practices.

[protonmail-encryption-explained]: https://proton.me/support/proton-mail-encryption-explained
[signal-x3dh-protocol]: https://www.signal.org/docs/specifications/x3dh/
[wikipedia-forward-secrecy]: https://en.wikipedia.org/wiki/Forward_secrecy
[wikipedia-encryption]: https://en.wikipedia.org/wiki/Encryption
[pgp]: https://www.openpgp.org/
[gpg]: https://gnupg.org/
[fb-e2ee]: https://proton.me/blog/protonmail-facebook-pgp
[nist-post-quantum-encryption]: https://www.nist.gov/news-events/news/2022/07/nist-announces-first-four-quantum-resistant-cryptographic-algorithms
[microsoft-tls-1.3]: https://www.microsoft.com/en-us/security/blog/2020/08/20/taking-transport-layer-security-tls-to-the-next-level-with-tls-1-3/
[cloudflare-tls-encrypted-client-hello]: https://blog.cloudflare.com/announcing-encrypted-client-hello/
[tom-scott-this-video-is-sponsored-by-vpn]: https://www.youtube.com/watch?v=WVDQEoe6ZWY&pp=ygUNdG9tIHNjb3R0IHZwbg%3D%3D
[joepie91-dont-use-vpn-services]: https://gist.github.com/joepie91/5a9909939e6ce7d09e29
