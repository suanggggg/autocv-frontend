let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;

let baseUrl2 = '' 	
let baseUrl3 = ''		
let baseUrl4 = ''	

if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
    baseImgPath = '/img/';
}else{
	baseUrl = '//elm.cangdu.org';
    baseImgPath = '//elm.cangdu.org/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath,
	baseUrl2,
	baseUrl3,
	baseUrl4
}

