# Google-Flights-Injector

Im trying to have a span with "risky" appear as the last element of each div with classname .MX5RWe.sSHqwe.y52p7d

I'm using
const targets = document.body.querySelectorAll(".MX5RWe.sSHqwe.y52p7d") to select every div,
then when I print 
console.log("nodes" + targets.length), I always get 0. 

I was able to add a div to the end of body however, but cannot seem to add elements within existing divs in the body.
