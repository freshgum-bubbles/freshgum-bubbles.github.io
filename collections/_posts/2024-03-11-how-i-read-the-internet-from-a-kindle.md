---
title: 'How I read the internet from a Kindle'
layout: post
custom_js:
    - path: /assets/js/i13/2024-03-11-how-i-read-the-internet-from-a-kindle/change-font.js
---

A lot of the time, I'll be reading a web article on my Kindle.
This seems interesting, so I thought I'd blog about it.

My daily driver is a [Kindle Voyage][wikipedia-kindle-voyage], undoubtedly one of the best devices of the lineup.
One of the main reasons for choosing it was its inclusion of page-switching buttons on
both sides, a feature which, for reasons unknown, is _very_ hard to find on modern devices.

I find reading on the Kindle very relaxing: I believe it's due to a combination of its
soft white lighting, remarkably simple interface, and an overall emphasis on the content,
as opposed to the interface around it.

All this serves as a very welcome escape from what the internet has now become:
a collection of over-stimulating, hyper-addictive content, which can turn you
into the consumer you've been told not to become. Newsflash, folks: **sometimes,
more is less.**

Anyway, one surprisingly helpful feature of the Kindle is its support for custom font faces.
This lets you provide the device with additional fonts for reading. In my case, I've
chosen _IBM Plex Serif_, which I eventually settled on after hours of adding more and
more font faces. Finding a good font is hard, folks -- it's not just you.

<sup class="text--muted u__js_required">
    <span class="text--bold">P.S.</span> Currently, this page is using the <span id="i13-current-font-name"></span> font.
    If you'd like, you can
    <button id="i13-font-selector-button" class="u__link">
        <span id="i13-proposed-font-name-adverb">temporarily</span>
        change the font to
        <span id="i13-proposed-font-name">IBM Plex Serif</span>
    </button>.
</sup>

Most of the time, the device lives in aeroplane mode. For anyone else, that essentially
means that, while the device _can_ connect to the internet, it spends most of its time
away from it -- this, of course, saves a substantial amount of power.

Naturally, this brings me onto a very important question: if the device remains offline,
how do I read the internet on it? Well, dear reader, that's achieved via software you
may have heard of: [Calibre][calibre-website].

Calibre is very powerful, and one of its main features is how it integrates with e-readers.
It's simply plug-and-play: plug in your Kindle via USB, and Calibre automatically detects it.
The magic of this process is still not lost.

A virtue of Calibre is its plugin ecosystem: in it you'll find a plethora of plugins,
all supporting different use-cases, adding auxilliary functionality, providing automation
features, modifying how books are formatted, and plenty more.

The most critical one today is _Action Chains_, a plugin which allows you to create different
workflows (or _chains_). Each chain is a list of actions to be performed as a result of the
chain being run. This can be used to your advantage by automating a certain task.

For instance, consider the following: when a new book is added to Calibre, you may typically
add a comment to it, or convert it to a format supported by your e-reader. **This can be
automated with _Action Chains_!**

Another brilliant feature of Calibre its ability to automatically import books which find
themselves in a certain directory -- this allows you to create a _hopper_, where "books"
are saved, which Calibre then imports after some processing.  Once finished, it deletes
them from the hopper, leaving the only copy left in the library folder.

This handy feature allows me to import websites into Calibre. I do this by saving pages
as _.pdf_ files, via Firefox's _Print to PDF_ feature. These are then, of course, thrown
into the hopper with the rest of the books.

After adding the `t+Website` tag to them and running an _Action Chains_ chain,
the plugin takes over, automatically converting the book to AZW3[^1] and polishing it.

That last part might sound silly ("how do you _polish_ an e-book?"), but it simply
refers to the process of compressing images, and generally cleaning up / making the book
smaller. The gains from this are quite surprising: some images can be _losslessly_ compressed
by _40%!_. It's been known to turn a 15MB e-book into 5MB. That's _definitely_ a win.

**Remember: The Voyage is only 4GB.**

The chain itself is rather simple: it converts the book to AZW3, deletes the original _.pdf_,
generates a cover for the book, adds a tag (which makes it easier to differentiate transcoded
and *non-*transcoded ones), and then sends it to the device.

![A picture of the *Action Chains* plugin with a dialog box opened.  The dialog box displays a custom chain, composed of 7 items in order: "Convert to AZW3", "Polish AZW3", "Remove All Except AZW3", "Generate cover.", "Add comment", "Add 'Transcoded Website' tag", and finally "Send to Device".](/assets/images/2024-03-11-calibre-action-chains-transcode-website-chain.png)

But there's a problem: what if the device _isn't connected_ when a website is transcoded?
Great question, dear viewer -- I'm glad you're paying attention! <sup>:-)</sup>

All this works in tandem with _another_ chain of the _Action Chains_ puzzle: _Event Manager_,
a feature of _Action Chains_ which allows it to automatically run a chain when an event is raised.
In this case, the event is the insertion of the device; when that's raised, _another_ chain is run.
This time, the chain is aptly named _Send Transcoded Websites to Device_.

![A picture of the *Event Manager* window, displaying a list containing one item named "Device Connected".  Above it is a dialog box, displaying the actions performed when the "Device Connected" event is reached.  In this case, that's a chain named "Send Transcoded Websites to Device".](/assets/images/2024-03-11-calibre-action-chains-device-connected-event-handler.png)

The chain being run is very simple in itself: it takes advantages of Calibre's fairly extensive
search syntax (which deserves a post in itself), which allows you to filter a library by searching
for "books" with specific tags.

In full, the search it performs is:
`ondevice:false and tags:"=t+Transcoded Website" and not tags:"=t+Sent to Device"`.
The "transcoded website" tag would have been added by the chain we explored earlier,
which performs the conversion of individual book files.

After the search is finished, whatever is found is sent to the device.

And that's it! That's how the entire process works.

---

How _well_ the individual files read ultimately depends on their respective websites: some developers
take the time to optimise their page for printing, and others don't; you might end up with cookie banners,
headers and infomercials in the PDF output.

Others? Well...

![A picture of the Print dialog in Firefox, pointed at page 3 of the web.dev website.  A blank page is followed by one with barely any text on it -- the point of this is to demonstrate how little time some webdevelopers pay to ensuring their websites are printable.](/assets/images/2024-03-11-web-dev-printout.png)

So it's somewhat of a gamble. If I like the site and its content, I do consider writing
to the author to see if they'd consider making the site more printer-friendly. (On the bright
side, there are extensions such as PrintFriendly which, depending upon the site, can make the
content more readable on an e-reader.)

As a rule of thumb, simpler sites tend to print better: if a site contains a boatload of banners,
popups, dialog boxes and sidebars, it probably won't print very well.  If you have a similar
workflow, you'll quickly realise that developers *just don't think about printing.*
My inner cynic tells me it reaches the same level of importance as making sure the site runs
without JavaScript.

On the topic of reading websites, you may be familiar with Chromium's _Reader View_, which
reduces a page down to a much simpler view, consisting of just the essentials: the heading,
the page's content, and very little else. To make this work, quite a lot of effort has been
put in behind the scenes: the functionality itself is achieved via the [_DOM Distiller_][dom-distiller]
project. Firefox, on the other hand, uses its own [_readability.js_][readability-js] library.

These libraries work by scanning the document and extracting parts of it to create a new,
cleaner, more accessible document. The new document is devoid of any styling, fonts, `iframes`,
and JavaScript -- this makes them much more accessible for slower devices with limited bandwidth.
The specific implementation details of these libraries are fascinating in their own right, and
certainly find themselves deserving of a separate blog post.

_"So what should I take away from all this?"_

For one, I'd argue that this is quite a reasonable use-case. If you're developing a web
site, you should most certainly include some form of printer-specific styling, which hides
web-focused content such as cookie banners and login buttons. **A printed version of your site should
provide an unfettered view of its content.**

So, if you can spare the time, I'd ask you to make sure your site prints well: it might seem odd
that some people still rely on this feature at all, but I'm willing to bet there are more people
out there, all doing the same as me.

[^1]: On the Kindle, AZW3 books support custom fonts, while other formats don't.

[calibre-website]: https://calibre-ebook.com/
[dom-distiller]: https://chromium.googlesource.com/chromium/dom-distiller
[readability-js]: https://github.com/mozilla/readability
[wikipedia-kindle-voyage]: https://en.wikipedia.org/wiki/Amazon_Kindle#Kindle_Voyage
