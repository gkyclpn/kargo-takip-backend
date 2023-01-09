const regex = new RegExp(`(?<x>(?<=<td align="left" valign="top" style="font-family: Tahoma, Helvetica, Arial; font-size:14px; color:#000006; text-align:left; padding-top:5px; line-height:18px;">[\\s]+)[^\\s]+\\s?.*)[\\s+<br>]+(?<y>([^\\s]+\\s?.*))`,'gm')

const html = `<!doctype html>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
 <meta name="format-detection" content="telephone=no, address=no, email=no, date=no">
 <meta name="x-apple-disable-message-reformatting">
 <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">
 <title>Siparişin onaylandı. Sipariş takibini hesabından yapabilirsin.</title>
</head>
 
 <style type="text/css">

  body {
   width: 100% !important; 
   background-color: #E9E9E9; }

  .ReadMsgBody {
   width: 100%;
  }

  .ExternalClass {
   width: 100%;
  }
  html {
   -webkit-text-size-adjust: none;
   min-width: 100%;
  }
  table, td {
   mso-table-lspace: 0pt;
   mso-table-rspace: 0pt;
  }
  img {
   -ms-interpolation-mode: bicubic;
   border: 0;
   outline: none;
  }

  table {
   border-collapse:collapse;
   border-spacing: 0 !important;
   margin: 0px auto;
  }

   a:-webkit-any-link {
   color: inherit !important;
   text-decoration: none;
   outline:none;
  }

  a[x-apple-data-detectors] {
   color: inherit !important;
   text-decoration: none !important;
   font-size: inherit !important;
   font-family: inherit !important;
   font-weight: inherit !important;
   line-height: inherit !important;
  }
 </style>


<body style="margin: 0px !important; padding: 0px !important;">

 <table border="0" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5; margin:0px auto; padding:0; font-family:Arial, sans-serif; color:#3E3E3E !important;" align="center" width="100%">
  <tr>
   <td>
    <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0; font-family:Arial, sans-serif; color:#3E3E3E !important;" align="center" width="600">
     <tr>
      <td>
       <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0;" align="center" width="600">
        <tr>
         <td>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa1cdb02c1d8a685eaaaf536f55637583697a8b3e8d9a9e7c904ddab2fbd08942c59151bb56511e15bba8e34eb0034edb1ec935b60333d9386" title="moda" style="text-decoration:none; color:#3b3b3b;" border="0">
           <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/logo.jpg" width="600" alt="" style="display: block;">
          </a>
         </td>
        </tr>
       </table>
      </td>
     </tr>
     <tr>
      <td>
       <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0;" align="center" width="600">
        <tr>
         <td align="left" valign="top">
          <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/menu-l.jpg" width="31" alt="" style="display: block;">
         </td>
         <td>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa1cdb02c1d8a685eaaaf536f55637583697a8b3e8d9a9e7c904ddab2fbd08942c59151bb56511e15bba8e34eb0034edb1ec935b60333d9386" title="moda" style="text-decoration:none; color:#3b3b3b;" border="0">
           <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/moda.jpg" width="68" alt="" style="display: block;">
          </a>
         </td>
         <td>
          <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/sperator.jpg" width="1" alt="" style="display: block;">
         </td>
         <td>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffaf2e4159c95be6c6a196cc96a8d190d5b6eef3e038cde74a3f6cfba59517962d1866bc1e92c3694f900ecb4f61cc2368ac21d8d5a1d020850" title="ev yasam" style="text-decoration:none; color:#3b3b3b;" border="0">
           <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/evyasam.jpg" width="79" alt="" style="display: block;">
          </a>
         </td>
         <td>
          <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/sperator.jpg" width="1" alt="" style="display: block;">
         </td>
         <td>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffad1124ded1fb03f14b858da078b177c62c42f0669ad981f5cca45722925d586e459bee742e943cf3f6970d11f39c9cdff23febe6fa75b6cb7" title="elektronik" style="text-decoration:none; color:#3b3b3b;" border="0">
           <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/elektronik.jpg" width="79" alt="" style="display: block;">
          </a>
         </td>
         <td>
          <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/sperator.jpg" width="1" alt="" style="display: block;">
         </td>
         <td>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa0c01ae8b08159e49687d1c6bb80ae703c194a7d8ef428d64928c2b8c3fc848359a35f4829294b7809b88c6b085fbeae0557d9f26ad24de03" title="hizli market" style="text-decoration:none; color:#3b3b3b;" border="0">
           <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/market.jpg" width="79" alt="" style="display: block;">
          </a>
         </td>
         <td>
          <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/sperator.jpg" width="1" alt="" style="display: block;">
         </td>
         <td>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffaab1cf44639d4f76286689e9cc188156b22b9bf51bcf1c2ff8d6f70fa76c85d83195858c39a0884ac0d3e7215909fd4199367588db583dd1b" title="yemek" style="text-decoration:none; color:#3b3b3b;" border="0">
           <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/yemek.jpg" width="79" alt="" style="display: block;">
          </a>
         </td>
         <td>
          <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/sperator.jpg" width="1" alt="" style="display: block;">
         </td>
         <td>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa2dc0b6052708245d5a3116eadbddc33887466a008befbb2e97d0d759689f466fb3a265c6a8bb968b045382c945ed97f37b51bf7e53c79db7" title="dolap" style="text-decoration:none; color:#3b3b3b;" border="0">
           <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/dolap.jpg" width="79" alt="" style="display: block;">
          </a>
         </td>
         <td>
          <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/sperator.jpg" width="1" alt="" style="display: block;">
         </td>
         <td>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffae2c0d3e5fc62304cfbf605d6632782aaa1db1952c2980f11e4ea3719c9e34b147f36956975af97f60f4e27ba9cf6c584c52719df4b9b4ec5" title="cuzdan" style="text-decoration:none; color:#3b3b3b;" border="0">
           <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/cuzdan.jpg" width="68" alt="" style="display: block;">
          </a>
         </td>
         <td align="right" valign="top">
          <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/menu-r.jpg" width="32" alt="" style="display: block;">
         </td>
        </tr>
       </table>
      </td>
     </tr>
     <tr>
      <td>&nbsp;</td>
     </tr>
     <tr>
      <td>
       <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0;" align="center" width="560">
        <tr>
         <td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="ninety" width="540" style="margin:auto; border:0;">
           <tr>
            <td align="center" valign="middle" bgcolor="#FFFFFF" style="font-family:Arial, sans-serif; font-size:17px; color:#303030; text-align:left; vertical-align:middle; padding-top:15px; font-weight:normal;">
    
    Merhaba,<br><br>

    <strong>1633029466</strong> numaralı siparişini aldık.
     
     <ul>
      <li>Siparişinin durumunu görüntülemek</li>
      <li>Siparişinin iptalini gerçekleştirmek</li>
     </ul>
     ve daha birçok işlem için <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa616033c1209b648940c226fce1fe18d6e43d3d0e1ecdd08b7add2a40b84a093e6331bb3bf89bdc4665fe42586506a486b5e5ecbe7cccf9ab" target="_blank" title="siparis-takip" style="color:#000000; text-decoration:underline; font-weight:bold;">Hesabım > Siparişlerim</a> sayfanı kullanabilirsin.

     
    

            </td>
           </tr>
          </table>
         </td>
        </tr>
        
        
        <tr>
         <td>
          <table width="540" border="0" align="center" cellpadding="0" cellspacing="0">
           <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
           </tr>
           <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
           </tr>
           <tr>
            <td align="left" valign="middle" bgcolor="#FFFFFF" width="65">
             <table align="center" cellpadding="0" cellspacing="0" style="margin:0px !important; padding:0px !important;">
              <tr>
               <td align="left" valign="middle">
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="margin:0px !important;">
                 <tbody>
                  <tr>
                   <td align="left" valign="middle"><img src="https://cdn.dsmcdn.com/assets/mailing/2018/sample/images/time-ret.png" width="65" /></td>
                  </tr>
                 </tbody>
                </table>
               </td>
              </tr>
             </table>
            </td>
            <td align="left">
             <table border="0" align="left" cellpadding="0" cellspacing="0">
              <tr>
               <td align="center" valign="middle"><table border="0" align="center" cellpadding="0" cellspacing="0">
                <tr>
                 <td align="left" valign="middle" nowrap="nowrap" bgcolor="#ffffff" style="font-family:Tahoma, Tahoma, Arial; font-size:16px; color:#f26928; text-align:left; vertical-align:middle; line-height:17px;"><strong>1. Teslimat:</strong></td>
                </tr>
               </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
           
           <tr>
            <td align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
            <td align="left">
             <table border="0" align="left" cellpadding="0" cellspacing="0">
              <tr>
               <td align="center" valign="middle">

                <table border="0" align="center" cellpadding="0" cellspacing="0">
                 <tr>
                  <td align="left" valign="middle" nowrap="nowrap" bgcolor="#ffffff" style="font-family:Tahoma, Tahoma, Arial; font-size:14px; color:#000000; text-align:left; vertical-align:middle; line-height:17px; font-weight: 500;;"> Tahmini Kargoya Teslim Süresi: <span style="font-weight:normal; color:#000000;">1 gün içinde</span>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
           
          </table>
         </td>
        </tr>
        
        <tr>
         <td>
          <table border="0" align="left" cellpadding="0" cellspacing="0" width="540">
            <tr>
             <td width="75">&nbsp;</td>
             <td align="left" valign="middle" style="font-size:12px; color:#a8a8a8; text-align:left; vertical-align:middle; line-height:100%;">
              Bu ürünler ÖZİŞ tarafından gönderilecektir.
             </td>
            </tr>
           </table>
          
         </td>
        </tr>
        <tr>
         <td align="left" valign="top" bgcolor="#fff">
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa71d47d418d5c67062c472e5238dd231e8614c04db170c451dc9a8576d82bde1eb486aebdef79a32f5e668179db1797baa43e96ec542b151d" style="font-family: Tahoma, Helvetica, Arial; max-width: 200px; padding: 4px 6px 7px 6px; background-color:#f26928; color: #fff !important; display: block; font-size: 13px; text-decoration: none; line-height: 14px; text-align: center; border-radius: 6px 6px 0px 0px; float: right; margin-right: 32px;">
           Satıcıyı Takip Et
          </a>
         </td>
        </tr>
        
        
        <tr>
         <td>
          <table width="540" border="0" align="center" cellpadding="10" cellspacing="0" style="background-color: #fcf6f2; padding-right:10px; padding-left:10px; padding-bottom:10px; padding-top:10px; max-width:350px !important;">
           <tr>
            <td align="left" valign="middle">
             <table width="105" align="left" cellpadding="0" cellspacing="0" style="background-color: #fcf6f2;">
              <tr>
               <td align="left" valign="middle" bgcolor="#fcf6f2;">
                <table width="105" border="0" align="left" cellpadding="0" cellspacing="0" style="background-color: #fcf6f2;">
                 <tr>
                  <td align="center" valign="middle">
                   <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa3ed57b4bff528020526af6fe1904425b9ffed583291573a363bd467e9caaed023eae77421c8cf1c65969e6755bdf75c2c281347954ab9398" target="_blank" style="display: block !important; text-decoration: none !important;">
                    <img src="https://cdn.dsmcdn.com//ty458/product/media/images/20220617/3/126582259/163161079/1/1_org_thumb.jpg" alt="trendyol" width="105">
                   </a>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
            <td align="left" valign="middle">
             <table align="left" border="0" cellpadding="0" cellspacing="0" width="350" style="max-width:350px;">
              <tr>
               <td align="left" valign="bottom">
                <table align="left" cellpadding="0" cellspacing="0" width="350">
                 <tr>
                  <td align="left" valign="top">
                   <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:10px; padding-top:10px;">
                    <tr>
                     <td align="left" valign="top" style="font-family: Tahoma, Helvetica, Arial; font-size:14px; color:#000006; text-align:left; padding-top:5px; line-height:18px;">
                      Pan Dükkan
                      <br>
                      The Lord Of The Rings Yüzüklerin Efendisi Orta Dünya Haritası Baskılı Kupa Bardak
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
              <tr>
               <td align="left" valign="middle">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="350" style="text-align:left;">
                 <tr>
                  <td align="left" style="border-bottom:1px solid #cdcdcd; padding-top:6px;"></td>
                 </tr>
                </table>
               </td>
              </tr>
              <tr>
               <td align="left" valign="top">
                <table align="left" cellpadding="0" cellspacing="0" width="350">
                 <tr>
                  <td align="left" valign="middle">
                   <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                     <td align="left" style="font-family: Tahoma, Arial; font-size:16px; color:#000006; text-align:left; padding-bottom:8px; padding-top:8px;">Adet: 1
                      <br />
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                 <tr>
                  <td align="left" valign="middle">
                   <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                     <td align="left" style="font-family:Tahoma, Arial; font-size:20px; color:#f26928; text-align:left; vertical-align:middle; padding-bottom:12px;">
                      <strong>48.9 TRY</strong>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>      
         </td>
        </tr>
        <tr>
         <td>&nbsp;</td>
        </tr>
        
        
        
        <tr>
         <td>
          <table width="540" border="0" align="center" cellpadding="10" cellspacing="0" style="background-color: #fcf6f2; padding-right:10px; padding-left:10px; padding-bottom:10px; padding-top:10px; max-width:350px !important;">
           <tr>
            <td align="left" valign="middle">
             <table width="105" align="left" cellpadding="0" cellspacing="0" style="background-color: #fcf6f2;">
              <tr>
               <td align="left" valign="middle" bgcolor="#fcf6f2;">
                <table width="105" border="0" align="left" cellpadding="0" cellspacing="0" style="background-color: #fcf6f2;">
                 <tr>
                  <td align="center" valign="middle">
                   <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa790a8ff55e53b39b7cc824ad0c531bf5c4a1aef94251cbfa014eb191c1158b90b7bd684d5c1f2da1ea7809fcd66968f612a82120b8141a04" target="_blank" style="display: block !important; text-decoration: none !important;">
                    <img src="https://cdn.dsmcdn.com//ty12/product/media/images/20200919/17/11233488/87558983/0/0_org_thumb.jpg" alt="trendyol" width="105">
                   </a>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
            <td align="left" valign="middle">
             <table align="left" border="0" cellpadding="0" cellspacing="0" width="350" style="max-width:350px;">
              <tr>
               <td align="left" valign="bottom">
                <table align="left" cellpadding="0" cellspacing="0" width="350">
                 <tr>
                  <td align="left" valign="top">
                   <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:10px; padding-top:10px;">
                    <tr>
                     <td align="left" valign="top" style="font-family: Tahoma, Helvetica, Arial; font-size:14px; color:#000006; text-align:left; padding-top:5px; line-height:18px;">
                      Penguen Dükkan Yarrak
                      <br>
                      Corpse Bride Ölü Gelin Baskılı Kupa Bardak
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
              <tr>
               <td align="left" valign="middle">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="350" style="text-align:left;">
                 <tr>
                  <td align="left" style="border-bottom:1px solid #cdcdcd; padding-top:6px;"></td>
                 </tr>
                </table>
               </td>
              </tr>
              <tr>
               <td align="left" valign="top">
                <table align="left" cellpadding="0" cellspacing="0" width="350">
                 <tr>
                  <td align="left" valign="middle">
                   <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                     <td align="left" style="font-family: Tahoma, Arial; font-size:16px; color:#000006; text-align:left; padding-bottom:8px; padding-top:8px;">Adet: 1
                      <br />
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                 <tr>
                  <td align="left" valign="middle">
                   <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                     <td align="left" style="font-family:Tahoma, Arial; font-size:20px; color:#f26928; text-align:left; vertical-align:middle; padding-bottom:12px;">
                      <strong>65.8 TRY</strong>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>      
         </td>
        </tr>
        <tr>
         <td>&nbsp;</td>
        </tr>
        
        
        
        <tr>
         <td>&nbsp;</td>
        </tr>
        
        
        <tr>
         <td>&nbsp;</td>
        </tr>
        <tr>
         <td>
          <table width="540" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
             <td align="left" valign="middle" bgcolor="#FFFFFF" width="65">
              <table align="center" cellpadding="0" cellspacing="0" style="margin:0px !important; padding:0px !important;">
               <tr>
                <td align="left" valign="middle">
                 <table align="left" border="0" cellpadding="0" cellspacing="0" style="margin:0px !important;">
                  <tbody>
                   <tr>
                    <td align="left" valign="middle"><img src="https://cdn.dsmcdn.com/assets/mailing/2018/sample/images/spr-ozet-retr.png" width="65"></td>
                   </tr>
                  </tbody>
                 </table>
                </td>
               </tr>
              </table>
             </td>
             <td align="left">
              <table border="0" align="left" cellpadding="0" cellspacing="0">
               <tr>
                <td align="center" valign="middle"><table border="0" align="center" cellpadding="0" cellspacing="0">
                 <tr>
                  <td align="left" valign="middle" nowrap="nowrap" bgcolor="#ffffff" style="font-family:Tahoma, Tahoma, Arial; font-size:16px; color:#f26928; text-align:left; vertical-align:middle; line-height:17px;"><strong>Sipariş Özeti:</strong></td>
                 </tr>
                </table>
                </td>
               </tr>
              </table>
             </td>
            </tr>
           </table>
         </td>
        </tr>
        <tr>
         <td>
          <table width="410" border="0" align="center" cellpadding="0" cellspacing="0" style="font-size: 13px !important; line-height: 20px !important;">
           <tr>
            <td>
             <table width="410" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
               <td>
                
                
                <table width="410" border="0" align="center" cellpadding="0" cellspacing="0">
                 <tr>
                  <td width="310" valign="middle">
                   Ara Toplam
                  </td>
                  <td align="right" valign="middle">
                   114.7 TRY
                   
                  </td>
                 </tr>
                </table>
                
                <table width="410" border="0" align="center" cellpadding="0" cellspacing="0">
                 <tr>
                  <td width="310" valign="middle">
                   Kargo
                  </td>
                  <td align="right" valign="middle">
                   19.99 TRY
                   
                  </td>
                 </tr>
                </table>
                
                <table width="410" border="0" align="center" cellpadding="0" cellspacing="0">
                 <tr>
                  <td width="310" valign="middle">
                   2. Ürüne %5 İndirim
                  </td>
                  <td align="right" valign="middle">
                   <span style="color: #f26928;">-2.45 TRY</span>
                   
                  </td>
                 </tr>
                </table>
                
                <table width="410" border="0" align="center" cellpadding="0" cellspacing="0">
                 <tr>
                  <td width="310" valign="middle">
                   75 TL ve Üzeri Kargo Bedava
                  </td>
                  <td align="right" valign="middle">
                   <span style="color: #f26928;">-19.99 TRY</span>
                   
                  </td>
                 </tr>
                </table>
                
               </td>
              </tr>
              <tr>
               <td style="border-top:1px solid #93989c;">
                <table width="410" border="0" align="center" cellpadding="0" cellspacing="0">
                 <tr>
                  <td width="310" valign="middle">
                   Toplam
                  </td>
                  <td align="right" valign="middle">
                   <strong>112.25 TRY</strong>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>&nbsp;</td>
        </tr>
        <tr>
         <td>
          <table width="540" border="0" align="center" cellpadding="0" cellspacing="0">
           <tr>
            <td align="left" valign="middle" bgcolor="#FFFFFF" width="65"><table align="center" cellpadding="0" cellspacing="0" style="margin:0px !important; padding:0px !important;">
             <tr>
              <td align="left" valign="middle"><table align="left" border="0" cellpadding="0" cellspacing="0" style="margin:0px !important;">
               <tbody>
                <tr>
                 <td align="left" valign="middle"><img src="https://cdn.dsmcdn.com/assets/mailing/2018/sample/images/maprr.gif" width="65" /></td>
                </tr>
               </tbody>
              </table></td>
             </tr>
            </table></td>
            <td align="left">
             <table border="0" align="left" cellpadding="0" cellspacing="0">
              <tr>
               <td align="center" valign="middle">
                <table border="0" align="center" cellpadding="0" cellspacing="0">
                 <tr>
                  <td align="left" valign="middle" nowrap="nowrap" bgcolor="#ffffff" style="font-family:Tahoma, Tahoma, Arial; font-size:16px; color:#f26928; text-align:left; vertical-align:middle; line-height:17px;">
                   <strong>Teslimat Adresi:</strong>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
          
         </td>
        </tr>
        <tr>
         <td>
          <table width="410" border="0" align="center" cellpadding="0" cellspacing="0" style="font-size: 13px !important; line-height: 20px !important;">
           <tr>
            <td>
             
             
             <table width="410" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
               <td>
                <strong>Ege Ekin Öztürk</strong><br>
                Şair baki sokak no 9 daire 7 ( Yücel apartman )<br/>
                Kartal / İstanbul
               </td>
              </tr>
             </table>
             
            </td>
           </tr>
          </table>
          
         </td>
        </tr>
        <tr>
         <td>&nbsp;</td>
        </tr>
        <tr>
         <td>
          <table width="540" border="0" align="center" cellpadding="0" cellspacing="0">
           <tr>
            <td align="left" valign="middle" bgcolor="#FFFFFF" width="65"><table align="center" cellpadding="0" cellspacing="0" style="margin:0px !important; padding:0px !important;">
             <tr>
              <td align="left" valign="middle"><table align="left" border="0" cellpadding="0" cellspacing="0" style="margin:0px !important;">
               <tbody>
                <tr>
                 <td align="left" valign="middle"><img src="https://cdn.dsmcdn.com/assets/mailing/2018/sample/images/maprr.gif" width="65" /></td>
                </tr>
               </tbody>
              </table></td>
             </tr>
            </table></td>
            <td align="left"><table border="0" align="left" cellpadding="0" cellspacing="0">
             <tr>
              <td align="center" valign="middle"><table border="0" align="center" cellpadding="0" cellspacing="0">
               <tr>
                <td align="left" valign="middle" nowrap="nowrap" bgcolor="#ffffff" style="font-family:Tahoma, Tahoma, Arial; font-size:16px; color:#f26928; text-align:left; vertical-align:middle; line-height:17px;"><strong>Fatura Adresi:</strong></td>
               </tr>
              </table></td>
             </tr>
            </table></td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>
          <table width="410" border="0" align="center" cellpadding="0" cellspacing="0" style="font-size: 13px !important; line-height: 20px !important;">
           <tr>
            <td>
             
                       
             <table width="410" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
               <td>
                <strong>Ege Ekin Öztürk</strong><br>
                
                Şair baki sokak no 9 daire 7 ( Yücel apartman )<br/>
                
                Kartal / İstanbul
               </td>
              </tr>
                
             </table>
             
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>&nbsp;</td>
        </tr>
        <tr>
         <td>&nbsp;</td>
        </tr>
        <tr>
         <td>
          <table width="280" border="0" align="center" cellpadding="4" cellspacing="0" style="border:1px solid #cdcdcd;">
           <tr>
            <td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
             <img src="http://image.email.trendyol.com/lib/fe3e157075640479711074/m/1/c731cd88-8194-4e80-b26b-fe8275835ec8.png" width="30" alt="Siparisini Takip Et" />
            </td>
            <td width="222" align="left" valign="middle" bgcolor="#FFFFFF" style="background-color:#FFFFFF; font-size:12px; text-align:left; vertical-align:middle; line-height:12px;">
             Ön bilgilendirme ve satış sözleşmesine <u><a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa60a1b6480a056e8c6dcff8f5cc1a1edb360cd1ae40a07d9dcf59330e29d2a66046e488296f2a70a127a2b177b091bde6def94af04bf93f55" target="_blank" style="color:#000006;; text-decoration:underline;">buradan</a></u> ulaşabilirsin
            </td>
           </tr>
          </table>
         </td>
        </tr>
        <tr>
         <td>&nbsp;</td>
        </tr>
       </table>
      </td>
     </tr>
     <tr>
      <td>&nbsp;</td>
     </tr>
     <tr>
      <td>&nbsp;</td>
     </tr>
     <tr>
      <td>
       <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0; color: #595959 !important;" align="center" width="560">
        <tr>
         <td width="280">
          <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0; font-size: 14px;" align="center" width="120">
           <tr>
            <td align="center">Türkiye'nin Trendyol'u</td>
           </tr>
           <tr>
            <td align="center">
             <table border="0" cellpadding="0" cellspacing="0" align="center" style="background-color:#FFFFFF; margin:0px auto; padding:0;" width="140">
              <tr>
               <td align="left">
                <a target="_blank" href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffae7c732bcd63882445162c4886eca0389f0e97eddc84470e45557e88037a27a2fca22208293973e8c8bd97f5b54311e59143be1d68e99a49b" style="color: #ffffff !important; text-decoration: none !important;" border="0">
                 <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/facebook-rr.png" width="30" alt="" style="padding-top: 8px;">
                </a>
               </td>
               <td align="left">
                <a target="_blank" href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa0938c4b3ceb10c77d7c24a4b39eaf799721b122b2a3972b48c1d72430fa95e5ecff5b9506206ad1c52a6033786b2e0761fb2d000c2da19cd" style="color: #ffffff !important; text-decoration: none !important;" border="0">
                 <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/twitter-rr.png" width="30" alt="" style="padding-top: 8px;">
                </a>
               </td>
               <td align="left">
                <a target="_blank" href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa8556c5d5a04ff9083d1f5b27dc18dc5b9d9b6e2745b2eb28d4102010f3bcb878db53f9278d34a74b704f982e6959efbee663c9d83206df87" style="color: #ffffff !important; text-decoration: none !important;" border="0">
                 <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/instagram-rr.png" width="30" alt="" style="padding-top: 6px;">
                </a>
               </td>
               <td align="left">
                <a target="_blank" href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa419cc8b90d236f1976dde47bac39c561b5355d123b152abab7b2f21ab3ec9d50487b9f7178fea356aa4238ca299e70d19554d75c46c4fcd5" style="color: #ffffff !important; text-decoration: none !important;" border="0">
                 <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/youTube-rr.png" width="30" alt="" style="padding-top: 8px;">
                </a>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
         </td>
         <td>
          <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0; font-size: 14px;" align="center" width="100%">
           <tr>
            <td align="center">Trendyol mobil uygulaması için</td>
           </tr>
           <tr>
            <td>
             <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0; font-size: 17px; color: #595959 !important;" align="center" width="200">
              <tr>
               <td align="center" style="padding-top: 8px;">
                <a target="_blank" href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffa696e276d88318ebbc4cf3bcee2c238881cf6016e2d1649fc881be70669ef618baaa919714b9e5ee7e222151fb15916827c3e79151bb653a0" style="color: #ffffff !important; text-decoration: none !important;" border="0">
                 <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/appStore.png" width="97" alt="">
                </a>
               </td>
               <td align="center" style="padding-top: 8px;">
                <a target="_blank" href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffaa51318b57530f16e20822bd1012920346e25fb88733a2a8aa5cb42c14b595499e72a8ecee2f9004d81087659d6680d10e36d8657a4907ea3" style="color: #ffffff !important; text-decoration: none !important;" border="0">
                 <img src="https://cdn.dsmcdn.com/mrktng/crm/new_TRX_mail/trendyol/googlePlay.png" width="85" alt="">
                </a>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
         </td>
        </tr>
       </table>
      </td>
     </tr>
     <tr>
      <td>&nbsp;</td>
     </tr>
     <tr>
      <td>&nbsp;</td>
     </tr>
     <tr>
      <td>
       <table border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; margin:0px auto; padding:0; font-size: 11px; color: #595959 !important;" align="center" width="560">
        <tr>
         <td align="center"> Ürün fiyatları zaman içinde değişiklik gösterebilir. Kampanya ve duyuru maillerinden çıkmak istiyorsan <br>
          <a href="https://click.email.trendyol.com/?qs=57bb861a0fb6dffadaa46e2c551a08e3bc506a296f05bc83084ab2ae7d257e50c06a0b6ea35bde1433ed38eb79438582b439750603c66924293fe3ea5a14251e" style="color: #595959 !important; text-decoration: underline !important;">
           <strong>Üyelik Bilgilerim</strong>
          </a> sayfasından tercihlerini değiştirebilirsin.
         </td>
        </tr>
        <tr>
         <td>&nbsp;</td>
        </tr>
        <tr>
         <td align="center"> İletişim: DSM Grup Danışmanlık İletişim ve Satış Ticaret A.Ş. <br> Maslak Mahallesi Saat Sokak Spine Tower No: 5 İç Kapı: 19 Sarıyer / İSTANBUL <br> Tel No: +90 (212) 331 3250 Mersis No: 0313055766900016 </td>
        </tr>
       </table>
      </td>
     </tr>
     <tr>
      <td>&nbsp;</td>
     </tr>
    </table>
   </td>
  </tr>
  <tr>
   <td>&nbsp;</td>
  </tr>
 </table> 
</body>
 <img src="https://click.email.trendyol.com/open.aspx?ffcb10-fec917747065067a-fe201572706d00787c1276-fe3e157075640479711074-ff9d1670-fe2611757064037e771179-fed310717464007f&d=100175&bmt=0" width="1" height="1" alt="">
</html>`
var arr = {},
    item;

while (item = regex.exec(html)) {
    arr[item[1]] = item[2]
}
console.log(arr)