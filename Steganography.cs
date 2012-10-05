using UnityEngine;
using System.Collections;

public class Steganongraphy : MonoBehaviour {

	public static Texture2D Encode(Texture2D image, string message){

		//Create a new texture to copy encoded pixels to
		Texture2D newTexture = new Texture2D(image.width,image.height);
		
		//This variable holds the total amount of bits in the message.
		int totalBits = 0;
	
		System.Text.Encoding encoding = System.Text.Encoding.ASCII;
		byte[] strBytes = encoding.GetBytes (message);
		
		
		BitArray strBits = new BitArray(strBytes);
		totalBits = strBits.Length;
		
		BitArray strLength = new BitArray(System.BitConverter.GetBytes(totalBits));
		
		//Create a new BitArray to hold the length of the message + the message itself.
		
		BitArray finalBits = new BitArray(strLength.Length + totalBits);
		int index = 0;
		for (int lb = 0;lb<strLength.Length;lb++){
			finalBits[lb] = strLength[lb];
			index++;
		}
		for (int sb = 0;sb<strBits.Length;sb++){
			finalBits[index] = strBits[sb];
			index++;
		}
		
		
		//Get the pixels for the image...
		Color[] imagePixels = image.GetPixels();
	
	
			for (int i=0;i<finalBits.Length;i++){
	
				if (finalBits[i] == true){
					imagePixels[i].a = 1.0f;
				}
				else {
					imagePixels[i].a = 0.99f;
				}
				
				
				
			}
			
	
		newTexture.SetPixels(imagePixels);
		newTexture.Apply();
		return newTexture;

}




	public static string Decode (Texture2D image){
		
		//Get the pixels for the image...
		Color[] imagePixels = image.GetPixels();
		
		//Go Through the First 32 Pixels and create a 4 byte array. 
		//This array should give us the message's length.	
		BitArray newBits = new BitArray(32);
		for (int i=0;i<32;i++){
			if(imagePixels[i].a == 1){
				newBits[i] = true;
			}
			else {
				newBits[i] = false;
			}
		}
		
		int total = System.BitConverter.ToInt32(ToByteArray(newBits), 0);
		BitArray messageBits = new BitArray(total);
		for (int j=32;j<total + 32;j++){
				if(imagePixels[j].a == 1){
					messageBits[j-32] = true;
				}
				else {
					messageBits[j-32] = false;
				}
		}
		
		return System.Text.Encoding.ASCII.GetString(ToByteArray(messageBits));
		
	}
	
	public static byte[] ToByteArray(BitArray bits){
		var bytes = new byte[bits.Length / 8];
		bits.CopyTo(bytes,0);
		return bytes;
	}


}
