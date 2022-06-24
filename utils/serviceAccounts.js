const env = process.env;
// const firebaseAdminServiceAccount = {
// 	type: env.FIREBASE_TYPE,
// 	project_id: env.FIREBASE_PROJECT_ID,
// 	private_key_id: env.FIREBASE_PRIVATE_KEY_ID,
// 	private_key:
// 		'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD2JS4Xy5g2Qkyb\ncNzRNJcNnnr3uBUJFFe25PLbj1viiQykddmVfss4oxwOXIoWZ/6yXncTze1mjSWJ\nb4eaNOTKHAWOlVKFJaNvKD68ey3uE5/xfhNAG48fZ9XItU6YGXpwqkqRBToz2QH7\n58jgd6Y6qYSbNmZULBw3Gwb4hP1CLUjXWBF4GFzqv9T/4Ckh8sgB0213ZM5qTXgo\nnCk324WqhEvlAz59oshbqnBMLKaRofyUI/IFQcBH8PCtTqSDc04TEkCFfn9mv6Pa\ny/iEJUG5Ys/drH5l1D890+/mLgdEfhnH4JHhF52CKr5FFbIUyOblUPtrA444Sv1x\nV7xxq/GvAgMBAAECggEAIRwENLgyq83EPz5xvYRc8zyHnu24iqWdXOE0F7uTaQf1\nVuPxVi4diOtL2VSyUGxBst2JF/VhwyMmUvPZIjGOOu+FAdZtKLLU5p1bvv+0wGsM\nXzANx9hNKrTNaXeV8FixAxms+Q/icdn1bdySRTti9U4bI8OwBQ9/5huxFtnQtUdd\nlfTZ4CAp5spRXfG2lmKx5QZVbWugeJ181RJjLYh/KlpioSlHPQBpPjVB0dJHpQho\n/7ngaJY/M9EuwCZBYw2cttSTmA70ELwjantrLWZBpNFETBGuw/5PsTUvtNGQrWpO\nDhT5QsBRxgCPKY0ypXngd36umfjXUpVSTCKtEq94pQKBgQD8Mxxa8NG6tbMuPdaB\n6+5F/IykKE5Wt6IaNrT9vcrWxLMLO0FdHWs1ezsilGIFfyqAyxvhO5O9eO4gAwJh\n9DD+XNf0nwsRTo3tVTuSUW16PXYaQwP/H4E5BhI/xz2WhaUctaz0ykt+/nU1mFDg\nafwiihdGRZPMJvCQuDUSsl16SwKBgQD52razhgL0pwYrxFgS+YUD5QG3eJzwd55F\nhVEkp5+ccoN4WHLduSWic/xdCLypfA2/tI/lKBkWMNlqvZSChnXDFqVTII7eeRCe\nJ2SWjfotaVd/8YRGXb4eFoJ01gbq1EeLNaEZHIBW15/WHuYuERANxchRrjrh9KSr\nFlqStVDHrQKBgQC1I4SnMLaCcwTqHpIWKL2v2M+vDCAQGr68MzTV1t58WTT7ySiO\nV5XsCMGVeZvZtNdzP+6bXC4l9Via925bqocR+t9FHIJXgONhZkluMzv9g21zOVUC\nhb9LlLfAxTrQBNdtgnNiMnX9FYhb4TWdqaHlsOc8mran+APq/dNoxWFsdwKBgBlP\nhbiT99Ku5NokLsPlUQs+9LiQWF2n0Hm8cqbi8DFaDGVxmFlLuztEwqjuDKaisYXd\nFcKiGEB+PFgq0lOSqXVU4vST1MVGwF81IGR8B374L+v/HGZActT7dMW/NL4vOPwq\nN6Kil4G0oDWBtdGu2tB6W7uiicaAEPpf7lb0VTWVAoGBAPo7VO0RKUMRumoZN+wE\ns4rRAhWCC4kUDqrvWcrOvDiUzdjaHDg2pOSA1wmFKOia89J3PPH6aLhN1fCDDkuW\nvMcd4F+H0P3jVd44W/l1fs4Hm1OU+rsO+/UOfprQtlVyIzoywstOBuzvp9zO1Y0I\nG6ykOVy9LDSH52ocsh612KdO\n-----END PRIVATE KEY-----\n',
// 	client_email: env.FIREBASE_CLIENT_EMAIL,
// 	client_id: env.FIREBASE_CLIENT_ID,
// 	auth_uri: env.FIREBASE_AUTH_URI,
// 	token_uri: env.FIREBASE_TOKEN_URI,
// 	auth_provider_x509_cert_url: env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
// 	client_x509_cert_url: env.FIREBASE_CLIENT_X509_CERT_URL,
// };

const firebaseAdminServiceAccount = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
// const firebaseAdminServiceAccount = {
// 	type: 'service_account',
// 	project_id: 'react-login-bd9ed',
// 	private_key_id: '64a0888529683d59b9e65b6815152e582a11da91',
// 	private_key:
// 		'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD2JS4Xy5g2Qkyb\ncNzRNJcNnnr3uBUJFFe25PLbj1viiQykddmVfss4oxwOXIoWZ/6yXncTze1mjSWJ\nb4eaNOTKHAWOlVKFJaNvKD68ey3uE5/xfhNAG48fZ9XItU6YGXpwqkqRBToz2QH7\n58jgd6Y6qYSbNmZULBw3Gwb4hP1CLUjXWBF4GFzqv9T/4Ckh8sgB0213ZM5qTXgo\nnCk324WqhEvlAz59oshbqnBMLKaRofyUI/IFQcBH8PCtTqSDc04TEkCFfn9mv6Pa\ny/iEJUG5Ys/drH5l1D890+/mLgdEfhnH4JHhF52CKr5FFbIUyOblUPtrA444Sv1x\nV7xxq/GvAgMBAAECggEAIRwENLgyq83EPz5xvYRc8zyHnu24iqWdXOE0F7uTaQf1\nVuPxVi4diOtL2VSyUGxBst2JF/VhwyMmUvPZIjGOOu+FAdZtKLLU5p1bvv+0wGsM\nXzANx9hNKrTNaXeV8FixAxms+Q/icdn1bdySRTti9U4bI8OwBQ9/5huxFtnQtUdd\nlfTZ4CAp5spRXfG2lmKx5QZVbWugeJ181RJjLYh/KlpioSlHPQBpPjVB0dJHpQho\n/7ngaJY/M9EuwCZBYw2cttSTmA70ELwjantrLWZBpNFETBGuw/5PsTUvtNGQrWpO\nDhT5QsBRxgCPKY0ypXngd36umfjXUpVSTCKtEq94pQKBgQD8Mxxa8NG6tbMuPdaB\n6+5F/IykKE5Wt6IaNrT9vcrWxLMLO0FdHWs1ezsilGIFfyqAyxvhO5O9eO4gAwJh\n9DD+XNf0nwsRTo3tVTuSUW16PXYaQwP/H4E5BhI/xz2WhaUctaz0ykt+/nU1mFDg\nafwiihdGRZPMJvCQuDUSsl16SwKBgQD52razhgL0pwYrxFgS+YUD5QG3eJzwd55F\nhVEkp5+ccoN4WHLduSWic/xdCLypfA2/tI/lKBkWMNlqvZSChnXDFqVTII7eeRCe\nJ2SWjfotaVd/8YRGXb4eFoJ01gbq1EeLNaEZHIBW15/WHuYuERANxchRrjrh9KSr\nFlqStVDHrQKBgQC1I4SnMLaCcwTqHpIWKL2v2M+vDCAQGr68MzTV1t58WTT7ySiO\nV5XsCMGVeZvZtNdzP+6bXC4l9Via925bqocR+t9FHIJXgONhZkluMzv9g21zOVUC\nhb9LlLfAxTrQBNdtgnNiMnX9FYhb4TWdqaHlsOc8mran+APq/dNoxWFsdwKBgBlP\nhbiT99Ku5NokLsPlUQs+9LiQWF2n0Hm8cqbi8DFaDGVxmFlLuztEwqjuDKaisYXd\nFcKiGEB+PFgq0lOSqXVU4vST1MVGwF81IGR8B374L+v/HGZActT7dMW/NL4vOPwq\nN6Kil4G0oDWBtdGu2tB6W7uiicaAEPpf7lb0VTWVAoGBAPo7VO0RKUMRumoZN+wE\ns4rRAhWCC4kUDqrvWcrOvDiUzdjaHDg2pOSA1wmFKOia89J3PPH6aLhN1fCDDkuW\nvMcd4F+H0P3jVd44W/l1fs4Hm1OU+rsO+/UOfprQtlVyIzoywstOBuzvp9zO1Y0I\nG6ykOVy9LDSH52ocsh612KdO\n-----END PRIVATE KEY-----\n',
// 	client_email: 'firebase-adminsdk-2paji@react-login-bd9ed.iam.gserviceaccount.com',
// 	client_id: '118153155943717605228',
// 	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
// 	token_uri: 'https://oauth2.googleapis.com/token',
// 	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
// 	client_x509_cert_url:
// 		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2paji%40react-login-bd9ed.iam.gserviceaccount.com',
// };

// const bigQueryServiceAccount = {
// 	type: env.BIG_QUERY_SERVICE_TYPE,
// 	project_id: env.BIG_QUREY_PROJECT_ID,
// 	private_key_id: env.BIG_QUERY_PRIVATE_KEY_ID,
// 	private_key:
// 		'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCulDQHfupqH7VQ\nwvhcxsa/XXXDzGGlKlJTlvyIys+N4Mi+L46LYcQC5DH66xnStTbpvkenQF930FZK\n5GzS5ud4XvlVpLY/KZLFYQ/b50xan74YI0OWEwSEQ4c4L5CY+K7+fK/AU6OzTHI2\nyc0KWZQSzzOWlVCHpGwp5nPBPH+osNz7IOtjpbonKplzNTEa4GLjENsITi6aq2Lo\nUXIg64oaaJIVJvSOWSh+f2gpkeEUnayb+Uw6ZfcwwN4vDCSCk6gOW+meLPHAMs0u\ncfl5gW4rW+A6zBqs45yC+Yv8/vQXRTXIlpa+2JUoDG+soO7manRYJUnLQH4kDNkX\nKxSdfMIdAgMBAAECggEABKcBbfO1ZoeayuCvQrWvZTkl4sZnEcI7eGvNJg4Vkufb\nIapdx5we357aMCAky4c1w+vkt/HQuX4tVoiY19P8dio9xckCbFN8zFLGW+thjwaz\nx6vk6LJwC+BK0bX+yfzSmQiUnHD+K1CNuKUPGEgD2K555vjqsPqyQTmZexxUIJgu\npPLa4ku3dW8evhMeJX7gvbdWWZ24ui2pD/RXjCOS4UVd5NDwi/dNT7FPZbk9YAtc\n2cxPwVdti8YgFAgT2fIzVEQY3xSIWbCXlBqAoGno8IOkogY/azvwpNxsnGmxZ97+\n/Jlp/u/wl8/+P0iRAbou8dQIYTgjYTuFG+vlMSfclwKBgQDxt8WgbRVD1x66Nupr\ndUvR8Suj2NxOakKDPOtee94Baw651yM9ONihbmn8oR6Ym7NWDdy+rQwmkGizqa0+\nAC4NF5CZ7qudQXvjAQ57Lxj5LE5frQY8RV+Ulmx64qbSzs9s8HtWVlfX/8isFUTX\nFgGkfQHbKqfjJDWsVAYwPaYD3wKBgQC45OL54gdM4c65Be6KodbI/15/9/RH1cRg\nftpQQgVlYdkNDp7j1aJYvqQsuBGAIXI7ahpF7Qo9NjI5TW2TUogC0fC99c3H924+\n3wfGRe6ZI5ywKtmExicw7Acrzdvbk02RyjItX+/84dIoGpM8yD8Vxb2/y4qE9U0x\nrmcOSdgZgwKBgCDmOmfTcQmCxhPiVZW6qU8x3Ba49YNWwybJq994TIc04xQ4S/uR\nOSr/tD1GULvEtWwJBvqM4xJ8pUOO3J2LuLjfdDb/XSxSNWJ4SlhJ2MRRW3l6O1cI\nujGnJ6yyHLKko2bYdHET33Dux4lke7IqtJ6GxTHnZGJuE0AZT55RRb9RAoGBAI9S\nzieJ8MLGH6sJUBoizg5M9oIYQUIWEP4EF1Mzel9WdBxNAxn1lr1YOod3wAkk5Bnu\na6Nc1h0RD+mffZs/1LLq7sUx72xc/xa5aJtnxkbrdiCRdsAXonWn4P8xuoYBL5Yd\nuLu3rJ7IplH0F8J8L3q/KBGuxBfA1y/102keEOflAoGBALsVoaXMKvSLWQr39F9x\n740AM9XtAsgJJERuAzXTtq8HBnLuFG4Zcb6Z44BaCkHCOuFt8rYDlx6YSImDY1Bq\nOmO+wFQgJG3yA5xAMss7hOshdCMHxBZnl13kxQMBvPdym/2Ql90mwbEA5eS5BGJK\nrLJzXj7axFX2fdeGqKnneBmY\n-----END PRIVATE KEY-----\n',
// 	client_email: env.BIG_QUERY_CLIENT_EMAIL,
// 	client_id: env.BIG_QUERY_CLIENT_ID,
// 	auth_uri: env.BIG_QUERY_AUTH_URI,
// 	token_uri: env.BIG_QUERY_TOKEN_URI,
// 	auth_provider_x509_cert_url: env.BIG_QUERY_AUTH_PROVIDER_X509_CERT_URL,
// 	client_x509_cert_url: env.BIG_QUERY_CLIENT_X509_CERT_URL,
// };

const bigQueryServiceAccount = firebaseAdminServiceAccount;

// const bigQueryServiceAccount = {
// 	type: 'service_account',
// 	project_id: 'react-login-bd9ed',
// 	private_key_id: '4d58899fcbd20897c3a85935475e9fb9692fd74f',
// 	private_key:
// 		'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHlmHRERqVH1OV\nHuDZF2J3PL4+QPZ570nG/xrlNl97j9TttJcL1mkOaVwKxGd2Bw/b2/8BZsFqfgDE\nhKKiZ7wAgZPCKadZoTx17tkrcqj/hK7KmvBzS6iFX++Scp3vRCv01JlkBezh1GCF\nik/ciPQlHYC6p+Zx8Wa62GkHcB/aPtnVEL7HmJEat5NHjv8t9UyHS33dTI+DHSEn\nAWcCO5noGZZTWgAPzUJk3TsMttUnH5gckWX/OwvrOWQzTpxUyUeoafUSq0coaOqF\njQulaqZJXby9li70J0lPG1OvSVTQs5gu7aQD+j0PKL8h2y5Zwz05YUi2DEyb9cnG\n5wfHcS6PAgMBAAECggEAWh5RUXyXE6E+9LSqEuvnpm4zelmL0RfWKLe0Va285EZX\n/vLNRueLrRmumSAAlT7wDrZhiKj0iViWkSVQZ+NN9K6NYJy9Nw/CBIAR5/fQTfuD\njvDxxCVz1LEyM95z6H7QGC7MiejRAlEKOhHvKGVgU8fkAaPhPi6hU5l2pwieIUT2\nRxphwKOqiRY0hpSwK85lOWFaxPg92gVkjUfr4Fw46TEkLA+hYv0Q5ijqKrJQtG5E\nmyGO0zriORr1Z7kcY1Nl58G32jqbOsB/A6l9lmwB9EwHZjdk7GaBIBvS8u6hatd/\nBEtcox0CLY9bNQGfFs/rv3iGF6P+1rFKl909WTZLIQKBgQDwI2zjPcLDMbrWa5jh\nZw5Xdn3ms4R5tNactNiGaWAxw3BfWoIL5w9q9koBcPOtUvDxWwsOjo1l8WKLW0ZB\nrVyVDMi1SuBy1zAyA3/M1UEBsYW65dcvKn2/Nc+JMRHzx3UTsdFZKODtWtETVk8W\n6kzWKvuMz2fS/mWZ6qw3X7YkrwKBgQDUxUSiw+KN+d4sHD3lnAog0hg8SNoeuQoE\n9P7NGolkR/3kqLolj3cs/ECCO9a2Wqfae2FFlyKXJv4E7+fBdLn7B5COS1Qs1Adx\nC0Ecby2mRNGqClBR11g7RwE3vMEyfSpyuJngjiZtowStrqdoG5gRY6tU8UCZEKcH\nHc1tZLXMIQKBgB4SYZ1na49kF+CoIsH/VNVxGj0ct/dBxSpkn0Tdx1UUA2t9exGg\ngtbDNutNSMaov1GKNC1DfsOIYe3PpVGuMwzbR/skAE2BUyDAPW3aOsTKhVOtWrAm\nYw7h3zZv9a6QiMHJn8zJiLlQiSQhx8+30Z10ToIIqxjKENEgiSZ6DuYzAoGBAMVf\nQS4ju/OsCBavFBP8zcBoZCb4Ba5eRBcZFYw5w52M0s7cXeEd1pWaYlTtIV4DdpXL\nwg4GBwZkG1uFGF1y5FsjR0tYQXtcLJMGt52i3JvSVxP/gUaKFsTWNyD3LdiiF1BY\nQhX2h1tIz7w1ugFvJ39qD7M6IIxc0DRfxwJlW+dBAoGBAIHPsD/0qnoIN/1+nGDk\nrdXbnwWVbkZSBRI5vOy7D2YeGL8D/Dl74xxaM991omJrjQ5IcP7t1LGESFYzeIdw\nCEaMMN1h3TbpuqebKqnqLQ8Pm1eTn8CM/lWiK/2NkP2W0trTuaJFFsFyAtfNCemR\nkXCL2vLa81+TDIWPmcTPFaNx\n-----END PRIVATE KEY-----\n',
// 	client_email: 'bibquery@react-login-bd9ed.iam.gserviceaccount.com',
// 	client_id: '114328314847230113764',
// 	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
// 	token_uri: 'https://oauth2.googleapis.com/token',
// 	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
// 	client_x509_cert_url:
// 		'https://www.googleapis.com/robot/v1/metadata/x509/bibquery%40react-login-bd9ed.iam.gserviceaccount.com',
// };

export { firebaseAdminServiceAccount, bigQueryServiceAccount };
