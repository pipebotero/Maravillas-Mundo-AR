function teclaPulsada(e)
{
	switch(e.keyCode){
		case 38:
			keys.up = true;
		break;
		case 40:
			keys.down = true;
		break;
		case 39:
			keys.right = true;
		break;
		case 37:
			keys.left = true;
		break;
		case 89: //y
                keys.y = true;
            break;
			case 88: //y
                keys.x = true;
            break;
		case 32:
			keys.space = true;
		break;
	}
}

function teclaSoltada(e)
{
	switch(e.keyCode){
		case 38:
			keys.up = false;
		break;
		case 40:
			keys.down = false;
		break;
		case 39:
			keys.right = false;
		break;
		case 37:
			keys.left = false;
		break;
		case 89: //y
                keys.y = false;
            break;
		case 88: //y
               keys.x = false;
        break;
				case 32:
					keys.space = false;
				break;
	}
}
