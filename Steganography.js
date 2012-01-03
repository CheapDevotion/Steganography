static function Encode(image : Texture2D, message : String){

	//Create a new texture to copy encoded pixels to
	var newTexture = new Texture2D(image.width,image.height);
	
	//This variable holds the total amount of bits in the message.
	var totalBits = 0;

	var encoding = System.Text.Encoding.ASCII;
	var strBytes = encoding.GetBytes (message);
	
	
	var strBits = new BitArray(strBytes);
	totalBits = strBits.Length;
	
	var result = System.Text.Encoding.ASCII.GetString(Steganography.ToByteArray(strBits));
	Debug.Log(result);
	
	

	
	var strLength = new BitArray(System.BitConverter.GetBytes(totalBits));
	
	//Create a new BitArray to hold the length of the message + the message itself.
	
	var finalBits = new BitArray(strLength.Length + totalBits);
	var index = 0;
	for (var lb = 0;lb<strLength.Length;lb++){
		finalBits[lb] = strLength[lb];
		index++;
	}
	for (var sb = 0;sb<strBits.Length;sb++){
		finalBits[index] = strBits[sb];
		index++;
	}
	
	
	//Get the pixels for the image...
	var imagePixels : Color[] = image.GetPixels();


		for (var i=0;i<finalBits.Length;i++){

			if (finalBits[i] == true){
				imagePixels[i].a = 1;
			}
			else {
				imagePixels[i].a = 0.99;
			}
			
			
			
		}
		

	newTexture.SetPixels(imagePixels);
	newTexture.Apply();
	return newTexture;

}

function CheckPixel(value : float){
	var pixelByte = System.BitConverter.GetBytes(value);
	var pixelBits = new BitArray([pixelByte[0]]);
	return pixelBits[0];
	
}


static function Decode (image : Texture2D){
	
	//Get the pixels for the image...
	var imagePixels : Color[] = image.GetPixels();
	
	//Go Through the First 32 Pixels and create a 4 byte array. 
	//This array should give us the message's length.	
	var newBits : BitArray = new BitArray(32);
	for (var i=0;i<32;i++){
		if(imagePixels[i].a == 1){
			newBits[i] = true;
		}
		else {
			newBits[i] = false;
		}
	}
	
	var total = System.BitConverter.ToInt32(ToByteArray(newBits), 0);
	Debug.Log(total + 32);
	var messageBits : BitArray = new BitArray(total);
	for (var j=32;j<total + 32;j++){
			if(imagePixels[j].a == 1){
				messageBits[j-32] = true;
			}
			else {
				messageBits[j-32] = false;
			}
	}
	
	return System.Text.Encoding.ASCII.GetString(ToByteArray(messageBits));
	
}

static function ToByteArray(bits : BitArray){
	var bytes = new byte[bits.Length / 8];
	bits.CopyTo(bytes,0);
	return bytes;
}

	

	
