Steganography Class for Unity
=============================

What is it?
-----------
Steganography is the art and science of writing hidden messages in such a way that no one, apart from the sender and intended recipient, suspects the existence of the message, a form of security through obscurity. The word steganography is of Greek origin and means "concealed writing" from the Greek words steganos (στεγανός) meaning "covered or protected", and graphei (γραφή) meaning "writing". The first recorded use of the term was in 1499 by Johannes Trithemius in his Steganographia, a treatise on cryptography and steganography disguised as a book on magic. Generally, messages will appear to be something else: images, articles, shopping lists, or some other covertext and, classically, the hidden message may be in invisible ink between the visible lines of a private letter.

The advantage of steganography, over cryptography alone, is that messages do not attract attention to themselves. Plainly visible encrypted messages—no matter how unbreakable—will arouse suspicion, and may in themselves be incriminating in countries where encryption is illegal. Therefore, whereas cryptography protects the contents of a message, steganography can be said to protect both messages and communicating parties.

Why did you write it?
---------------------
I originally got the idea from a [facebook post](http://www.facebook.com/notes/monaco/steganography-the-secret-data-behind-the-level-images/437497056995) from Andy Schatz, and he credits the Spore developers for bringing this technology into games. He used Steganography to save Monoco level data inside an image of the level. I originally wrote this for a game where information about a particular monster was saved inside a "card" of that monster. This card could be traded via email or other means, and retain all of it's data. That feature was scrapped, but I held on to the code because well... it's pretty cool.


How does it work?
-----------------
Feel free to look at the code to get all the details, but my implementation is a little different than Andy's. In a nutshell, I convert a string to bits, and adjust the alpha channel of a few image pixels slightly to represent the bits. 


Why is this implementation not perfect?
---------------------------------------
I represent each bit as a 0.99(0) or 1(1) in the alpha channel. If you have an image that uses those same pixels for transparency, you will notice that those pixels are no longer transparent. As a quick solution, you could adjust the code to use low alpha values (0 and 0.01) to represent each bit. If needed, you could also use a completely different channel.


How do I use it?
----------------
Just include the Steganography.js file in your project and call the following static methods in any other file.

~~~
Steganography.Encode(Texture2D, String);
Steganography.Decode(Texture2D);
~~~



License
-------
This code is released under the [WTFPL](http://sam.zoy.org/wtfpl/). Seriously.



