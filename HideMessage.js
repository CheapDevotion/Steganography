var texture : Texture2D;
var encodedTexture : Texture2D;


function Start () {
	
	encodedTexture = Steganography.Encode(texture,"This is my level data or save game information");
	Debug.Log(Steganography.Decode(encodedTexture));	
	
}
