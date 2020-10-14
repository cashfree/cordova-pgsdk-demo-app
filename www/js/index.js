/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById("onWEB").addEventListener("click", cordovaDevice);
 
}

var testUrl = "https://test.cashfree.com/api/v2/cftoken/order";
var prodUrl = "https://api.cashfree.com/api/v2/cftoken/order";

function cordovaDevice() {
	  var orderIdValue = "Order" + Math.floor(Math.random() * 100000) + 1;

	  
  const options = {
  method: 'post',
  data: {
                   orderId: orderIdValue,
                   orderAmount : 1,
                   orderCurrency :'INR' 
              },
   headers: {
                  'Content-Type': 'application/json',
                 'x-client-id':'your client id',
                 'x-client-secret': 'your secert client id'
            }
};

console.log('CF::SDK::' +testUrl);
console.log('CF::SDK::' +JSON.stringify(options));


cordova.plugin.http.setDataSerializer("json");
cordova.plugin.http.sendRequest(testUrl, options, function(response) {
  // prints 200
   var result=JSON.parse(response.data);
   console.log("CF::SDK::",result.cftoken);
   var mapNew ={"appId":"your client id'",
                                   "orderId":orderIdValue,
                                   "orderAmount":"1",
                                   "orderNote":"Cashfree Test",
                                   "customerName":"Cashfree",
                                   "customerPhone":"9094395340",
                                    "customerEmail":"arjun@cashfree.com",
                                     "notifyUrl":"https://www.yourendpoint.com/",
                                      "orderCurrency":"INR",
                                      "stage":"test",
                                      "tokenData":result.cftoken}
     cordova.exec(function(success) {
             	 console.log('FROM Cordova'+ success);
             },              //success callback
             function(error) {
             		 console.log('FROM Cordova'+ error);
             }, 
             "PgCordovaWrapper",                      
             "startPaymentWEB",    
             [mapNew]);                                 

}, function(response) {
  console.log(response.status);
  console.log(response.error);
    

});
}
