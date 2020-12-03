var SOCKET = null; 

var watchingGame = 0;
var watchingGameID = 0;
var spinArray = ['animation900', 'animation1080'];
var gameJoin = 0;
var tradeInterval;
var balance;
var joinItems = [];

var Gapa01;
var Gapa02;
var Items;
var invRefreshTime = 0;

//CHAT FUNCTIONS
var hideLink = false;

//CHAT FUNCTIONS
var position =1;
$(function () {
        $('.position').click(function (event) {
            var el = $(event.target);
            $('.position').removeClass('selected');
            el.addClass('selected');
            position = el.attr('data-position');
        });
    });
 $(function () {
        $('.position').click(function (event) {
            var el = $(event.target);
            $('.position').removeClass('selected');
            el.addClass('selected');
            position = el.attr('data-position');
        });
    });
function SaveToDisk(fileURL, fileName) {
    if (!window.ActiveXObject) {                // for non-IE
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || fileURL;
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
    else if (!!window.ActiveXObject && document.execCommand) {  // for IE
        var _window = window.open(fileURL, "_blank");
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}
function getCookie(key){
    var patt = new RegExp(key+"=([^;]*)");
    var matches = patt.exec(document.cookie);
    if(matches){
        return matches[1];
    }
    return "";
}
$(document).ready(function() {
    connect();

    //BOT-MESSAGE

    if(getCookie('hide') == '')
    {
        setCookie('hide', 'false');
        hideLink = false;
    }
    else if(getCookie('hide') == 'true')
    {
        hideLink = true;
    }
    else if(getCookie('hide') == 'false')
    {
        hideLink == false;
    }

    $('#coinflip').on('hidden.bs.modal', function () {
      watchingGameID = 0;
      wachingGame = 0;
      $('#coin').remove();
    });

    $(document).on("change", ".price-sorting", function() {

        var sortingMethod = $(this).val();
        console.log('ggg');
        if(sortingMethod == 'l2h')
        {
            console.log('l2h');
            sortItemsPrice('L2H');
        }
        else if(sortingMethod == 'h2l')
        {
            console.log('h2l');
            sortItemsPrice('H2L');
        }
    
    });

     // $("#Tobalance").click(function(){
     //    SOCKET.emit("Tobalance",{assets:passetIds,hash:getCookie('hash')});
     // })
    $('#CFjoinGame').on('hidden.bs.modal', function () {
        $('.container1').empty();
        for(var i in joinItems) {
            $('.container1').append('<div class="item-card__wrapper item" style="float: left;"><div class="item-card steam-quality-baseGrade steam-appid-730" price="' + joinItems[i].pret + '" assetid="' + joinItems[i].id + '"><div class="item-card__header"><h4 class="item-card__title_main steam-category-normal name">' + joinItems[i].name + '</h4><small class="item-card__title_opt"></small></div><div class="item-card__image-wrapper item-card__image-wrapper--alfa"><img class="item-card__image item-card__image--zoom" src="' + joinItems[i].url + '"></div><div class="item-card__footer"><small style="position: relative;top: 24px;left: 0px;padding: 5px 10px;font-size: 11px;color: #fff;font-weight: bold;">$<span class="val">' + joinItems[i].pret + '</span></small></div></div></div>');
        }
    });

    $('#theMessage').val('');

    $('#sendMsg').click(function() {
        var mesaj = $('#theMessage').val();
        $('#theMessage').val('');

        sendMessage(mesaj.replace(/<(?:.|\n)*?>/gm, ''));
    });

    $('#createCF').click(function() {
     
        $('#CFcreate').modal();
    });

    $('#mChatRules').click(function() {
        $('#chatRules').modal();
    });

    $('#settingsMenu').click(function() {
        $('#settingsModal').modal();
    });

    $('#rclose').click(function() {
        $('#chatRules').modal('hide');
    });

	$('#button1').click(function() {
        var td = $('#input1').val();
		SaveToDisk(td, 'image');
         
    });
	
	$('#button2').click(function() {
        var email = $('#input_email').val();
		var username = $('#input_username').val();
		var pass1 = $('#input_pass1').val();
		var pass2 = $('#input_pass2').val();
        
       var position = 1;

   // $('.notify').click(function (event) {
        
   // });

    
 

    
        if(!email.includes("@"))
        {
            //alertify.error('Incorrect email parameters');
            Notification.create(
            // Title
            "Incorrect email parameters",
            // Text
            "Please input the correct email parameters",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
        }
        else if(pass1 != pass2)
        {
           // alertify.error('Password confirmation must be the same');
            Notification.create(
            // Title
            "Password confirmation",
            // Text
            "Password confirmation must be the same",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
        } 
		else if(username.includes(" ")) 
		{
			//alertify.error('Remove all spaces from username');
            Notification.create(
            // Title
            "Remove all spaces from username",
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
		}
		else if(username.length > 16) 
		{
			//alertify.error('Max username length are (16)');
            Notification.create(
            // Title
            "Max username length are (16)",
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
		}
		else if(username.length < 5) 
		{
			//alertify.error('Min username lenght are (5)');
            Notification.create(
            // Title
            "Min usernmae length are (5)",
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
		}
		else if(username == "" || pass1 == "" || pass2 == "" || email == "") 
		{
			//alertify.error('Make sure all fields are filled');
            Notification.create(
            // Title
            "Make sure all fields are filled",
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
		}
		else if(pass1.length < 8) 
		{
			//alertify.error('Min password lenght are (8)');
            Notification.create(
            // Title
            "Min password length are (8)",
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
		}
		else 
		{
			window.location.assign("accounts/register.php?email=" + email + "&password=" + pass1 + "&username=" + username);
		}
	});

	$('#button3').click(function() {
		var email = $('#login_email').val();
		var pass = $('#login_password').val();
		
        if(!email.includes("@"))
        {
            //alertify.error('Incorrect email parameters');
            Notification.create(
            // Title
            "Incorrect email parameters",
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
        }
		else if(pass == "" || email == "") 
		{
			//alertify.error('Make sure all fields are filled');
            Notification.create(
            // Title
            "Make sure all fields are filled",
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
		}
		else if(pass.length < 8) 
		{
			//alertify.error('Min password lenght are (8)');
            Notification.create(
            // Title
            "Min password length are (8)",
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "shake",
            // Position
            position
         );
		}
		else 
		{
			window.location.assign("/login.php?email=" + email + "&password=" + pass);
		}
	});

    // $('#showTradeURL').click(function() {
    //     $('#tradeLink').modal();
    // });
	
    $('#openRegister').click(function() {
        $('#register').modal();
    });
	
    $('#openLogin').click(function() {
        $('#login').modal();
    });


    $('#hidetheLink').click(function() {
        $('#hidetheLink').attr(this.checked);
    });

    $.ajaxSetup({ cache: false });
    $('#invRefresh').click(function() {
        $('.container1').empty();
        wantInventory();
    });

    $.ajaxSetup({ cache: false });
    $('#invRefresh2').click(function() {
        $('.container2').empty();
        showCreateInv();
    });

    if(getCookie('hide') == 'true')
    {
        $('#hidetheLink').attr('checked', 'true');
    }
    else if(getCookie('hide') == 'false')
    {
        $('#hidetheLink').attr('checked', 'false');
    }

    $('#submitSettings').click(function() {
        if(($('#hidetheLink').prop('checked')) == true) {
            setCookie('hide', 'true');
            $('#settingsModal').modal('hide');
            hideLink = true;

        }
        else
        {
            setCookie('hide', 'false');
            $('#settingsModal').modal('hide');
            hideLink = false;
        }
    });

    $('#Message').submit(function () {
     return false;
    });

});

function sendMessage(msg)
{
    if(SOCKET)
    {
        var utilizator = getCookie('hash');
        SOCKET.emit('nMsg', {
            message: msg,
            user: utilizator,
            hide: hideLink
        });
    }
}

function onMessage(msg)
{
    var m = msg;
    if(m.type == "watchCF")
    {
        console.log(msg)
        if(m.id == watchingGameID)
        {
           
            $('#coin-flip-cont #coin').remove();
            $('#coin-flip-cont').prepend('<div id="coin"></div>');

            var P1Skins = "";
            var P2Skins = "";

            var gameid = m.id;

            var timer11 = m.timer11;
            var timer01 = m.timer;
            var ttimer11 = m.ttimer11;

            var hash = m.hash;
            var secret = m.secret;
            var cChance;
            var pChance;

            var cname = m.cname;
            var cavatar = m.cavatar;
            var cskinsurl = m.cskinsurl.split('/@');
            var temp = m.cskinsnames;
            while(temp.indexOf('##') != -1)
             {
                temp = temp.replace("##","★");
             }
             while(temp.indexOf('#$') != -1)
             {
                temp = temp.replace("#$","™");
             }
            var cskinsnames = temp.split('/');
            var cskinsprices = m.cskinsprices.split('/');
            var cskins = m.cskins;
            var ctp = m.ctp;
            var pname = m.pname;
            var pavatar = m.pavatar;
            var pskinsurl = m.pskinsurl.split('/@');
            var pskinsnames = m.pskinsnames.split('/');
            var pskinsprices = m.pskinsprices.split('/');
            var pskins = m.pskins;
            var ptp = m.ptp;
            var winner = m.winner;

            $('.gameSecrettt').text('');
            $('.gameSecrettt').attr('title', '');


            if(ptp == '0')
            {
                ptp = '0.00';
            }

            if(winner == '1' || winner == '2' || timer11 == '1')
            {
                var total = ctp + ptp;
                cChance = parseFloat((ctp / total) * 100).toFixed(2);
                pChance = parseFloat((ptp / total) * 100).toFixed(2);
                $('.P2-tItems').text(pskins);
                $('#ptp').text(' ' + ptp);
            }
            else if(winner == '-1')
            {
                cChance = '50.00';
                pChance = '50.00';
                $('.P2-tItems').text('0');
            }

            $('#coinflip-watch-gameid').text('Game #' + gameid);
            $('.gameHashh').text(textAbstract(hash, 20));
            $('#P1name').html('<span style="color: #eee; text-decoration: none;">' + cname + '</span>');
            $('#P1avatar').attr('src', '/uploads/'+cavatar);
            if(m.scode ==1)
            {
                $("#P1coin").attr('src',"/assets/images/coin-t1.png");
                $("#P2coin").attr('src',"/assets/images/coin-ct2.png");
            }
            else
            {
                $("#P2coin").attr('src',"/assets/images/coin-t1.png");
                $("#P1coin").attr('src',"/assets/images/coin-ct2.png");
            }
            $('#P1avatar').attr('style', 'width: 130px');
            $('.P1-tItems').text(cskins);
            $('.P1chance').text(cChance + '%');
            $('#ctp').text(' ' + ctp);
            for(var i = 0; i < cskins; i++)
            {
                P1Skins += '<div class="row row-item"><div class="col-xs-12 col-md-3 col-item"><img src="' + cskinsurl[i] + '/120fx100f" alt="" class="img-responsive"></div><div class="col-xs-12 col-md-6 col-name">' + cskinsnames[i] + '</div> <div class="col-xs-12 col-md-3 col-amount"><i class="fa fa-dollar"></i> ' + cskinsprices[i] + '</div></div>';
            }
            $('#ItemsP1').html(P1Skins);

            if(!pname && timer11 == '0')
            {
                $('#P2name').html('<span style="color: #a0a0a0; text-decoration: none;">Waiting...</span>');
            }
            else
            {
                $('#P2name').html('<span style="color: #a0a0a0; text-decoration: none;">' + pname + '</span>');
            }
            if(!pavatar && timer11 == '0')
            {
                $('#P2avatar').attr('src', 'https://bubble-at4vegnhqpi2zkmsnjd.stackpathdns.com/img/nophoto_user.png');
                $('#P2avatar').attr('style', 'width: 130px');
                $('.P2chance').text('50.00%');
                
            }
            else
            {
                $('#P2avatar').attr('src', '/uploads/'+pavatar);
                $('#P2avatar').attr('style', 'width: 130px');
                $('.P2chance').text(pChance + '%');
            }
            $('.P2-tItems').text(cskins);
            $('#ptp').text(' ' + ctp);
            if(pname && winner == -1 && timer11 == '0')
            {
                P2Skins = '<br><br><span style="text-align: center;">User joining ...</span>';
                $("#coinflip #coin").countdown360({
                    radius      : 50,
                    seconds     : timer01,
                    fontColor   : '#FFFFFF',
                    fillStyle   : '#fe634a',
                    strokeStyle : '#dc393c',
                    autostart   : false,
                    label       : false,
                    smooth      : true,
                    onComplete  : function() {
                        $('#coinflip #coin').remove();
                    }
                }).start();
            }
            else
            {
                for(var i = 0; i < pskins; i++)
                {
                    P2Skins += '<div class="row row-item"><div class="col-xs-12 col-md-3 col-item"><img title="' + pskinsnames[i] + ' - $' + pskinsprices[i] + '" src="' + pskinsurl[i] + '/120fx100f" alt="" class="img-responsive"></div><div class="col-xs-12 col-md-6 col-name">' + pskinsnames[i] + '</div> <div class="col-xs-12 col-md-3 col-amount"><i class="fa fa-dollar"></i> ' + pskinsprices[i] + '</div></div>';
                }
            }

            if(timer11 != '0' && winner == -1)
            {

                $("#coin-flip-cont #coin").empty();  
            

                $("#coin-flip-cont #coin").countdown360({
                    radius      : 50,
                    seconds     : timer11,
                    fontColor   : '#FFFFFF',
                    autostart   : false,
                    label       : false,
                    smooth      : true,
                    onComplete  : function () {
                        //$('#coinflip #coin').empty();conso
                        console.log("end");
                      // SOCKET.emit("getWinner",{id:m.id,price:m.ctp,hash:getCookie('hash')});
                     
                    }
                }).start();
            }

            $('#ItemsP2').html(P2Skins);
           
            if(winner != -1)
            {
                

                $('#coin').remove();
                $("#coinflip #coin-flip-cont").prepend('<div id="coin"><div class="front"></div><div class="back"></div></div>');
                watchingGame = 0;
                watchingGameID = 0;

                var timer = 50;
                var sayingTimer = setInterval(function() {
                    timer = timer - 10;
                    if(timer == 0)
                    {
                        clearInterval(sayingTimer);
                        setTimeout(function(){
                            $('#coinflip .front').css('background-image', 'url('+cavatar+')')
                            $('#coinflip .back').css('background-image', 'url('+pavatar+')');

                            if(m.scode == 2)
                            {
                                if(winner==1)
                                    winner = 2;
                                else
                                    winner = 1;
                            }
                            console.log("scode",m.scode);
                            console.log("winner",winner);
                            $('#coinflip #coin').addClass(getSpin(winner));
                            
                            

                            setTimeout(function() {
                                    $('#coinflip .gameSecrettt').addClass('animated fadeIn');
                                    $('#coinflip .gameSecrettt').html('Secret: ' + secret + '<br><a href="fair.php> <i class="fa fa-question-circle" title="Validate round"></i></a>');
                                    $('#coinflip .gameSecrettt').attr('title', secret);
                            }, 3000);
                        }, 100);
                    }
                }, 100);
            }
        }
    }
    else if(m.type == 'msg')
    {
        if(m.tip == 'error')
        {
            $.notify(m.msg, 'success');
        }
        else if(m.tip == 'alert')
        {
            $.notify(m.msg, 'success');
        }
        else if(m.tip == 'Inv')
        {
            var seconds = m.seconds;

            var InvTimer = setInterval(function() {
                if(seconds != 0)
                {
                    seconds = seconds - 1;
                    $('#invRefresh').html('Could refresh in ' + seconds + ' seconds.');
                    $('#invRefresh').attr('disabled', 'true');
                }
                else
                {
                    $('#invRefresh').html('<i class="fa fa-refresh"></i> Refresh inventory');
                    $('#invRefresh').removeAttr('disabled');
                    clearInterval(InvTimer);
                }
            }, 1000);
        }
        else if(m.tip == 'Inv2')
        {
            var seconds = m.seconds;

            var InvTimer = setInterval(function() {
                if(seconds != 0)
                {
                    seconds = seconds - 1;
                    $('#invRefresh').html('Could refresh in ' + seconds + ' seconds.');
                    $('#invRefresh').attr('disabled', 'true');
                }
                else
                {
                    $('#invRefresh').html('<i class="fa fa-refresh"></i> Refresh inventory');
                    $('#invRefresh').removeAttr('disabled');
                    clearInterval(InvTimer);
                }
            }, 1000);
        }
    }
    else if(m.type == 'addGame')
    {

        addGame(m.games);
    }
    else if(m.type == 'editGame')
    {
        editGame(m.games);
    }
    else if(m.type == 'removeGame')
    {
    	$('#game-'+m.id).removeClass('zoomIn');
    	$('#game-'+m.id).addClass('zoomOut');
    	setTimeout(function() {
        	$('#game-'+m.id).remove();
    	}, 300);
    }
    else if(m.type ==="getGame")
    {
         
        var images = m.games.cskinsurl.split('/@');
        var names =  m.games.cskinsnames.split("/");
        var prices = m.games.cskinsprices.split("/");
        var total = m.games.ctp;
        var scode = m.games.scode;
        balance2 = m.games.balance;
        $(".itemsVar").text(images.length);
        if(scode == '2')
            $("#join_coin").attr("src","/assets/images/coin-t1.png")
      
        
        
      
       
        for(var i  =0; i < images.length; i ++)
        {
            //total += parseFloat(prices[i]);
            $('.container1').append('<div class="item-card__wrapper item" style="float: left;"><div class="item-card steam-quality-baseGrade steam-appid-730" price="' + prices[i]+ '"><div class="item-card__header"><h4 class="item-card__title_main steam-category-normal name">' + names[i] + '</h4><small class="item-card__title_opt"></small></div><div class="item-card__image-wrapper item-card__image-wrapper--alfa"><img class="item-card__image item-card__image--zoom" src="' + images[i] + '" alt="' + names[i] + '"></div><div class="item-card__footer"><small style="position: relative;top: 24px;left: 0px;padding: 5px 10px;font-size: 11px;color: #fff;font-weight: bold;">$<span class="val">' + prices[i] + '</span></small></div></div></div>');
        }
       
        var fee = total * 0.06;
        fee = fee.toFixed(2);
        all = parseFloat(total)+parseFloat(fee);
        $('.modal-loading').fadeOut();
        $("#fee1").text(fee);
        $("#totalValue").text(total);

        $("#allValue1").text(all);
    }
    else if(m.type == 'addMessage')
    {
        var mesaj = m.msg;
        var numee = m.username;
        var avatar =  m.avatar.toString();
        var email = m.email;
        var rank = m.rank;
        var hide = m.hide;
        var level = m.level;

        if(m.tip == 'clear')
        {
            $('#chatMessages').empty();
            return;
        }

        if(rank == 69)
        {
            nume = 'background: linear-gradient(-270deg, rgba(35, 35, 35, 0.5), rgba(27, 27, 27, 0.5));';
        } else {
            nume = '';
        }

        if(hide == true)
        {
            $('#chatMessages').append('<li style="list-style-type: none;padding-top: 10px;' + nume + '" class="msg"><span class="message" style="line-height: 2em;padding: auto;color: #b3b3b3;letter-spacing: 0.03px;font-family: Roboto, sans-serif;font-weight: 600;font-size: 12px;"><img style="margin-right: 5px;vertical-align: middle;height: 35px;border-radius: 50%;" src="/uploads/' + avatar + '"><a   href="#"><span style="color:rgba(179,179,179, 0.8);font-weight: 600;font-size: 13px;letter-spacing: 0.8px;font-family: Open Sans, sans-serif;"><b> [Lvl ' + level + '] ' + numee + ' </b></span><a/><br><span style="font-size: 15px;margin: auto;color: rgba(185, 185, 185, 0.8);font-weight: 600;margin-top: 8px;display: block;font-family: Open Sans, sans-serif;">' + mesaj + '</span></br></span></li>');
        }
        else if(hide == false)
        {
            $('#chatMessages').append('<li style="list-style-type: none;padding-top: 10px;' + nume + '" class="msg"><span class="message" style="line-height: 2em;padding: auto;color: #b3b3b3;letter-spacing: 0.03px;font-family: Roboto, sans-serif;font-weight: 600;font-size: 12px;"><img style="margin-right: 5px;vertical-align: middle;height: 35px;border-radius: 50%;" src="/uploads/' + avatar + '"><a  href="#"><span style="color:rgba(179,179,179, 0.8);font-weight: 600;font-size: 13px;letter-spacing: 0.8px;font-family: Open Sans, sans-serif;"><b> [Lvl ' + level + '] ' + numee + ' </b></span><a/><br><span style="font-size: 15px;margin: auto;color: rgba(185, 185, 185, 0.8);font-weight: 600;margin-top: 8px;display: block;font-family: Open Sans, sans-serif;">' + mesaj + '</span></br></span></li>');
        }


        var objDiv = document.getElementById("chatMessages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    else if(m.type == 'connections')
    {
        $('.users-online-value').text(m.total);
    }
    else if(m.type == 'getInventory')
    {
        var name = m.name;
        var pret = m.price;
        var url = m.img;

        var Games = [];

        for(var i in pret)
        {
            Games.push({
                name: name[i],
                pret: pret[i],
                url: url[i]
            });
        }

        Games.sort(function(a,b) {
            return b.pret - a.pret;
        });

        joinItems = [];

        for(var i in Games)
        {
            joinItems.push({
                name: Games[i].name,
                pret: Games[i].pret,
                url: Games[i].url
            });
        }
        for(var i in Games) {
            $('.container1').append('<div class="item-card__wrapper item" style="float: left;"><div class="item-card steam-quality-baseGrade steam-appid-730" price="' + Games[i].pret + '"><div class="item-card__header"><h4 class="item-card__title_main steam-category-normal name">' + Games[i].name + '</h4><small class="item-card__title_opt"></small></div><div class="item-card__image-wrapper item-card__image-wrapper--alfa"><img class="item-card__image item-card__image--zoom" src="' + Games[i].url + '" alt="' + Games[i].name + '"></div><div class="item-card__footer"><small style="position: relative;top: 24px;left: 0px;padding: 5px 10px;font-size: 11px;color: #fff;font-weight: bold;">$<span class="val">' + Games[i].pret + '</span></small></div></div></div>');
        }
    }
    else if(m.type == 'getInventory2')
    {
        var name = m.name;
        var pret = m.price;
        var url = m.img;
        var id = m.id;
        balance = m.balance;

        var Games = [];

        for(var i in pret)
        {
            var temp = name[i];
           while(temp.indexOf('##') != -1)
             {
                temp = temp.replace("##","★");
             }
             while(temp.indexOf('#$') != -1)
             {
                temp = temp.replace("#$","™");
             }
            Games.push({
                name: temp,
                pret: pret[i],
                url: url[i],
                id:id[i]
            });
        }
       
        // Games.sort(function(a,b) {
        //     return b.pret-a.pret
        // });
        
        
    $('.container2').html("");
        for(var i in Games) {
            $('.container2').append('<div class="item-card__wrapper item" style="float: left;"><div class="item-card steam-quality-baseGrade steam-appid-730" assetid="'+ Games[i].id +'"  price="' + Games[i].pret + '"><div class="item-card__header"><h4 class="item-card__title_main steam-category-normal name">' + Games[i].name + '</h4><small class="item-card__title_opt"></small></div><div class="item-card__image-wrapper item-card__image-wrapper--alfa"><img class="item-card__image item-card__image--zoom" src="' + Games[i].url + '" alt="' + Games[i].name + '"></div><div class="item-card__footer"><small style="position: relative;top: 24px;left: 0px;padding: 5px 10px;font-size: 11px;color: #fff;font-weight: bold;">$<span class="val">' + Games[i].pret + '</span></small></div></div></div>');
        }
    }
    else if(m.type == 'loadStatistics')
    {
        $('#cfTotalAmount').countTo({to: parseFloat(m.totalAmount).toFixed(2), speed: 600, refreshInterval: 50});
        $('.cfTotalItems').countTo({to: m.totalItems, speed: 600, refreshInterval: 50});
        $('.cfActiveGames').countTo({to: m.activeGames, speed: 600, refreshInterval: 50});
    }
    else if(m.type == 'modals')
    {
        if(m.tip == 'trade')
        {
            if(m.result == 'offerProcessing')
            {
                $('.modal').modal('hide');
                    setTimeout(function() {
                    $('#tradeModal').modal();
                    $('#tradeModal .modal-content').html('<p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-danger"><i class="fa fa-spinner fa-spin"></i> Processing trade offer...</p>');
                }, 300);
            }
            else if(m.result == 'offerSend')
            {
                var seconds = 90;
                $('.modal').modal('hide');
                setTimeout(function() {
                    $('#tradeModal').modal();
                    $('#tradeModal .modal-content').html('<p id="myModalLabel" class="tradeAlert modal-title alert text-center alert-success">Trade #' + m.tid + ' (<a target="_blank" style="color: #f7c22c !important;" href="https://steamcommunity.com/tradeoffer/' + m.tid + '">accept offer</a>)<br/>with code #' + m.code + ' has been sent!</p>');
                    tradeInterval = setInterval(function() {
                        seconds = seconds - 1;
                        $('.secondsTradeoffer').text(seconds);
                        if(seconds == 0)
                        {
                            $('.modal').modal('hide');
                            setTimeout(function() {
                                $('#tradeModal').modal();
                                $('#tradeModal .modal-content').html('<p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-danger">Tradeoffer expired!</p>');
                                setTimeout(function() {
                                    $('.modal').modal('hide');
                                }, 2000);
                                clearInterval(tradeInterval);
                            }, 400);
                        }
                    }, 1000);
                }, 400);
            }
            else if(m.result == 'offerAccepted')
            {
                $('.modal').modal('hide');
                setTimeout(function() {
                    $('#tradeModal').modal();
                    $('#tradeModal .modal-content').html('<p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-success">Tradeoffer accepted.</p>');
                    setTimeout(function() {
                        $('#tradeModal').modal('hide');
                        clearInterval(tradeInterval);
                    }, 2000);
                }, 400);
            }
            else if(m.result == 'offerDeclined')
            {
                $('.modal').modal('hide');
                setTimeout(function() {
                    $('#tradeModal').modal();
                    $('#tradeModal .modal-content').html('<p style="font-weight: bold;" id="myModalLabel" class="tradeAlert modal-title alert text-center alert-danger">Tradeoffer declined.</p>');
                    setTimeout(function() {
                        $('#tradeModal').modal('hide');
                        clearInterval(tradeInterval);
                    }, 2000);
                }, 400);
            }
        }
    }
}

function getSpin(value,count_id='') {
    var spin;

//     $('#coin .front').animate({
//    'width': '+=30px',
//    'height': '+=30px',
//    'margin-left': '-=15px'
//     }, 1500, function(){
//    $('#coin .front').animate({
//     'width': '-=30px',
//     'height': '-=30px',
//     'margin-left': '+=15px'
//    }, 1500);
//     });
//     $('#coin .back').animate({
//    'width': '+=30px',
//    'height': '+=30px',
//    'margin-left': '-=15px'
//     }, 1500, function(){
//    $('#coin .back').animate({
//     'width': '-=30px',
//     'height': '-=30px',
//     'margin-left': '+=15px'
//    }, 1500);
//     });



console.log("spin",value);


// if(count_id!='')
//     {
//         $(count_id+' .front').animate({
//        'width': '+=10px',
//        'height': '+=10px',
//        'margin-left': '-=5px'
//         }, 1500, function(){
//        $(count_id+' .front').animate({
//         'width': '-=10px',
//         'height': '-=10px',
//         'margin-left': '+=5px'
//        }, 1500);
//         });
//         $(count_id+' .back').animate({
//        'width': '+=10px',
//        'height': '+=10px',
//        'margin-left': '-=5px'
//         }, 1500, function(){
//        $(count_id+' .back').animate({
//         'width': '-=10px',
//         'height': '-=10px',
//         'margin-left': '+=5px'
//        }, 1500);
//         });
//     }





    $("#coinflip #coin").html(`<div class="coin-main">
    <div class="coin"></div>
    </div>`);



    if(value == '1') {
        return spin = spinArray[1];
    }else if(value == '2') {
        return spin = spinArray[0];
    }



    
}


function watchGame(gameID,flag=0)
{
    if(SOCKET)
    {
        watchingGameID = gameID;
        watchingGame = 1;
        var left=10;
        var left = $("#countdown"+gameID).countdown360().getTimeRemaining();
        console.log("left",left);
        if (parseInt(left)>10)
            left = 10;
        $("#countdown"+gameID).countdown360().stop();
        
        setTimeout(function() {
            SOCKET.emit('watchGame', {
                gameid: gameID,left:left,flag:flag
            });
            $('#coinflip').modal();
            if(flag ==0)
                {
                    $("#countdown"+gameID).countdown360().start();
                }
            else
                $("#countdown"+gameID).countdown360()._clearRect();
            
             
        }, 200);
    }
}

function joinGame(gameID, Gap01, Gap02)
{
    if(SOCKET)
    {
        gameJoin = gameID;

        Gapa01 = parseFloat(Gap01).toFixed(2);
        Gapa02 = parseFloat(Gap02).toFixed(2);

        $('#CFjoinGame').modal();

        $('.Gap01').text(parseFloat(Gap01).toFixed(2));
        $('.Gap02').text(parseFloat(Gap02).toFixed(2));

        $('.offerValidator').html('Needs: $' + Gap01 + '-' + Gap02);
        SOCKET.emit("getGame",{gameID:gameID,hash:getCookie('hash')});
      //  wantInventory();
    }
}

function connect()
{
	if (!SOCKET)
	{
        var hash = getCookie('hash');
        if (hash == "") {
            //$.notify('You must login!', 'success');
        }
        if (hash != "") {
            //$.notify('Connecting to server ...', 'success');
        }
         SOCKET = io(':4433');
        SOCKET.on('connect', function(msg) {
            if (hash != "") {
                //$.notify('Connected!', 'success');
            }
            SOCKET.emit('hash', {
                hash: hash
            });
            $('#games tr').remove();
        });
        SOCKET.on('connect_error', function(msg) {
            $.notify('Connection lost!', 'success');
        });
        SOCKET.on('message', function(msg) {
            onMessage(msg);
        });
        SOCKET.on("killGame",function(msg){
            console.log("killGame",msg.id);
            $("#game-"+msg.id).remove();
        })
        SOCKET.on("newSuccess",function(m){
              $('#CFcreate').modal('hide');
            //alertify("You have successfully created Battle #"+m.id);
            Notification.create(
            // Title
            "You have successfully created Battle #"+m.id,
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "fadeIn",
            // Position
            position
         );
         console.log(m);
         var balance = m.balance;
        
          $("#u_balance").text(balance)  ;
        })
        SOCKET.on("joinSuccess",function(m){
            $("#CFjoinGame").modal('hide');
            //alertify('You have successfully joined battle #'+m.id);;
             Notification.create(
            // Title
            "You have successfully joined Battle #"+m.id,
            // Text
            "",
            // Illustration
            "/assets/images/msg.svg",
            // Effect
            "fadeIn",
            // Position
            position
          );
           // $('#coinflip').modal();

          $("#u_balance").text(m.balance.toFixed(2))  ;
           watchGame(m.id);

        })
        SOCKET.on("getWinner",function(m){
            console.log("winner",m);
            // $("#coin").empty();
            //  $("#coin").append('<div class="front"></div><div class="back"></div>');
                        var timer = 50;
                      
                        var sayingTimer = setInterval(function() {
                            timer = timer - 10;
                            console.log(timer);
                            if(timer == 0)
                            {
                                clearInterval(sayingTimer);
                                setTimeout(function(){
                                    $('#coin .front').css('background-image', 'url(/assets/images/coin-t1.png)')
                                    $('#coin .back').css('background-image', 'url(/assets/images/coin-ct2.png)');
                                    $('#coinflip #coin').addClass(getSpin(m.winner));
                                
                                }, 100);

                                if(getCookie('hash') == m.hash)
                                {
                                    setTimeout(function(){
                                        Notification.create(
                                            // Title
                                            "Congratulations! You have won Battle #"+m.id,
                                            // Text
                                            "",
                                            // Illustration
                                            "/assets/images/msg.svg",
                                            // Effect
                                            "zoomInUp",
                                            // Position
                                            position
                                         );
                                    }, 5000);
                                    
                                    //alertify("Congratulations! You have won battle #" + m.id);
                                }
                            }
                        }, 100);
          
            var obj = $("#countdown" + m.id);
            if(m.winner == "1")
                obj.html("<img src='/assets/images/coin-t1.png'>");
            else
                obj.html("<img src='/assets/images/coin-ct2.png'>");
             
                       

        })
        SOCKET.on('disconnect', function(m) {

            SOCKET.emit('disconnect', {
                uhash: hash
            });
        });
    }
    else
    {
        console.log("Error: connection already exists.");
    }
}

function setCookie(key,value){
	var exp = new Date();
	exp.setTime(exp.getTime()+(365*24*60*60*1000));
	document.cookie = key+"="+value+"; expires="+exp.toUTCString();
}

function textAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    return text + "...";
}

function addGame(gameInf)
{

    var f = "";
    var games = gameInf;
    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';

    var NeedsG01;
    var NeedsG02;
  
    var cskinsImages = games.cskinsurl.split('/@');
        var temp = games.cskinsnames;
        while(temp.indexOf('##') != -1)
             {
                temp = temp.replace("##","★");
             }
             while(temp.indexOf('#$') != -1)
             {
                temp = temp.replace("#$","™");
             }
        var cskinsNames = temp.split('/');
        var cskinsPrices = games.cskinsprices.split('/');
    if(games.cemail && games.pemail)
    {
        //TEXTDRAW1
        td1 = '<img title="' + games.cname + '" width="40px" height="40px" src="/uploads/' + games.cavatar + '"> <font style="margin: 0 7px;" size="2">vs</font> <img title="' + games.pname + '" width="40px" height="40px" src="/uploads/' + games.pavatar + '">';
        //TEXTDRAW2
        

        var pskinsImages = games.pskinsurl.split('/');
        var pskinsNames = games.pskinsnames.split('/');
        var pskinsPrices = games.pskinsprices.split('/');
         var temp1 = games.pskinsnames;
        while(temp.indexOf('##') != -1)
             {
                temp = temp.replace("##","★");
             }
             while(temp.indexOf('#$') != -1)
             {
                temp = temp.replace("#$","™");
             }
        var pskinsNames = temp1.split('/');
        var totalSkins = games.cskins;// + games.pskins;
        if(games.winner == -1)
        {
            td2 += cskinsImages.length + ' items<br>';
        }
        else
        {
            td2 += totalSkins + ' items<br>';
        }

        td2 += '<div id="Skinss">';
        var allSkinsImages = cskinsImages;//.concat(pskinsImages);
        var allSkinsPrices = cskinsPrices;//.concat(pskinsPrices);
        var allSkinsNames = cskinsNames;//.concat(pskinsNames);

        var more = 0;


        if(games.winner == -1)
        {
            var items = [];
            for(var i = 0; i < cskinsNames.length; i++)
            {
                items.push({
                    name: cskinsNames[i],
                    price: cskinsPrices[i],
                    url: cskinsImages[i]
                });
            }

            items.sort(compare);

            function compare(a,b) {
                if (a.price > b.price)
                  return -1;
                if (a.price < b.price)
                  return 1;
                return 0;
            }

            for(var i = 0; i < items.length; i++)
            {
                if(i < 5)
                {
                    td2 += '<img style="border: 1px solid rgba(15, 16, 16, 0.2);" title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="' + items[i].url + '/70fx50f">';
                }
                else
                {
                    more++;
                }
            }

            if(more > 0)
            {
                td2 += '+' + more + ' more';
            }
        }
        else
        {
            var items = [];
            for(var i = 0; i < totalSkins; i++)
            {
                items.push({
                    name: allSkinsNames[i],
                    price: allSkinsPrices[i],
                    url: allSkinsImages[i]
                });
            }

            items.sort(compare);

            function compare(a,b) {
                if (a.price > b.price)
                  return -1;
                if (a.price < b.price)
                  return 1;
                return 0;
            }

            for(var i = 0; i < items.length; i++)
            {
                if(i < 5)
                {
                    td2 += '<img style="border: 1px solid rgba(15, 16, 16, 0.2);" title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="' + items[i].url + '/70fx50f">';
                }
                else
                {
                    more++;
                }
            }

            if(more > 0)
            {
                td2 += '+' + more + ' more';
            }
        }

        td2 += '</div>';
        //TEXTDRAW3
        var totalSkins = games.ctp + games.ptp;
        td3 = '$' + parseFloat(totalSkins).toFixed(2);
        //TEXTDRAW4
        td4 = '';
        td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ',1)" value="View" readonly />';
    }
    email = $("#input_email").val();
    if(games.cemail && !games.pemail)
    {
        //TEXTDRAW1
        td1 = '<img title="' + games.cname + '" width="40px" height="40px" src="/uploads/' + games.cavatar + '">';
        //TEXTDRAW2
       
        var totalSkins = games.cskins;

        td2 += totalSkins + ' items<br>';
        td2 += '<div id="Skinss">';
        var more = 0;

        var items = [];
        for(var i = 0; i < totalSkins; i++)
        {
            items.push({
                name: cskinsNames[i],
                price: cskinsPrices[i],
                url: cskinsImages[i]
            });
        }

        items.sort(compare);

        function compare(a,b) {
            if (a.price > b.price)
              return -1;
            if (a.price < b.price)
              return 1;
            return 0;
        }

        for(var i = 0; i < totalSkins; i++)
        {
            if(i < 5)
            {
                td2 += '<img style="border: 1px solid rgba(15, 16, 16, 0.2);" title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="' + items[i].url + '/70fx50f">';
            }
            else
            {
                more++;
            }
        }
        if(more > 0)
        {
            td2 += '+' + more + ' more';
        }
        td2 += '</div>';
        //TEXTDRAW3
        var calculate = 10/100*games.ctp;
        var Gap01 = games.ctp - calculate;
        var Gap02 = games.ctp + calculate;
        NeedsG01 = Gap01;
        NeedsG02 = Gap02;
        td3 = '$' + games.ctp.toFixed(2) + '<br>';//Needs: $' + parseFloat(Gap01).toFixed(2) + ' - ' + parseFloat(Gap02).toFixed(2);
        //TEXTDRAW4
        td4 = '<input style="width:50px; height: 30px; font-size: 12px;" class="btn duel-btn-succes" id="cfJoinGame" onclick="joinGame(' + games.id + ', ' + parseFloat(NeedsG01).toFixed(2) + ', ' + parseFloat(NeedsG02).toFixed(2) + ')" value="Join" readonly />';
        td4 += '<i class="btn duel-btn-lg fa fa-eye" id="cfViewGame" onclick="watchGame(' + games.id + ',1)"></i>';
    }

    if(games.cemail && games.pemail && games.winner != '-1')
    {
        if(games.winner == 1)
        {
            td4 = '<span id="Winner" class ="WinnerFadeIn"><img width="40px" height="40px" src="/uploads/' + games.cavatar + '"></span>';
            td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg new__game__button" id="cfViewGame" onclick="watchGame(' + games.id + ',1)" value="View" readonly />';

        }
        else if(games.winner == 2)
        {
            td4 = '<span id="Winner" class ="WinnerFadeIn"><img width="40px" height="40px" src="/uploads/' + games.pavatar + '"></span>';
            td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg new__game__button" id="cfViewGame" onclick="watchGame(' + games.id + ',1)" value="View" readonly />';
        }
    }

    if(games.cemail == email)
    {
        if(games.cemail && !games.pemail)
        {
            var price = parseInt(games.ctp*100);
            f += '<tr data-price="' + price + '" style="border-left: 3px solid #1a8a49;" id="game-' + games.id + '" class="animated zoomIn">';
        }
        else if(games.cemail && games.pemail)
        {
            var price = parseInt((games.ctp + games.ptp)*100);
            f += '<tr data-price="' + price + '" style="border-left: 3px solid #1a8a49;" id="game-' + games.id + '" class="animated zoomIn">';
        }
    }
    else
    {
        if(games.cemail && !games.pemail)
        {
            var price = parseInt(games.ctp*100);
            f += '<tr data-price="' + price + '" id="game-' + games.id + '" class="animated zoomIn">';
        }
        else if(games.cemail && games.pemail)
        {
            var price = parseInt((games.ctp + games.ptp)*100);
            f += '<tr data-price="' + price + '" id="game-' + games.id + '" class="animated zoomIn">';
        }
    }

    if(games.cemail && games.pemail && games.winner == '-1')
    {
        td4 = '';
        td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg new__game__button" id="cfViewGame" onclick="watchGame(' + games.id + ',1)" value="View" readonly />';
    }

    var td5 = '<div id="countdown'+games.id+'" style="width: 50px; height: 50px;"></div>';


    f += '<td id="td0-' + games.id + '">#' + games.id + '</td>';
    f += '<td id="td1-' + games.id + '">' + td1 + '</td>';
    f += '<td id="td2-' + games.id + '">' + td2 + '</td>';
    f += '<td id="td3-' + games.id + '">' + td3 + '</td>';
    f += '<td id="td5-' + games.id + '">' + td5 + '</td>';
    f += '<td class="cf-action" style="text-align: right" id="td4-' + games.id + '">' + td4 + '</td>';
    f += "</tr>";

  if($( "#games tr" ).length == 0) {
    $('#games').prepend(f);
  } else {
    $( "#games tr" ).each(function( index ) {
      if(price > parseInt($(this).attr('data-price'))) {
        $(this).before(f);
        return false;
      }
      if(index == $( "#games tr" ).length-1) {
        $("#games tr").last().after(f);
      }
    });
  }

    if(games.pemail && games.winner == -1 && games.timer11 == '0') {
      $("#countdown"+games.id).countdown360({
        radius      : 20,
        seconds     : games.timer,
        fontColor   : '#FFFFFF',
        fillStyle   : '#fe634a',
        strokeStyle : '#dc393c',
        autostart   : false,
        label       : false,
        smooth      : true,
        onComplete  : function() {
            $('#countdown'+games.id).empty();
        }
      }).start();
    }

    if(games.pemail && games.timer11 != '0' && games.winner == '-1')
    {
        $("#countdown"+games.id).countdown360({
            radius      : 20,
            seconds     : games.timer11,
            fontColor   : '#FFFFFF',
            autostart   : false,
            label       : false,
            smooth      : true,
            onComplete  : function () {
                
               $('#countdown'+games.id).empty();
             
            }
        }).start()
    }
 
}


function editGame(gameInf)
{
    var games = gameInf;
    var td1 = '';
    var td2 = '';
    var td3 = '';
    var td4 = '';

    var NeedsG01;
    var NeedsG02;
    
        var cskinsImages = games.cskinsurl.split('/@');
         
        var cskinsPrices = games.cskinsprices.split('/');
        var temp = games.cskinsnames;
        while(temp.indexOf('##') != -1)
             {
                temp = temp.replace("##","★");
             }
             while(temp.indexOf('#$') != -1)
             {
                temp = temp.replace("#$","™");
             }
        var cskinsNames = temp.split('/');

    if(games.cemail && games.pemail)
    {
        //TEXTDRAW1
        td1 = '<img title="' + games.cname + '" width="40px" height="40px" src="/uploads/' + games.cavatar + '"> <font style="margin: 0 7px;" size="2">vs</font> <img title="' + games.pname + '" width="40px" height="40px" src="/uploads/' + games.pavatar + '">';
        //TEXTDRAW2
        var pskinsImages = cskinsImages;//games.pskinsurl.split('/@');
        var pskinsPrices = cskinsPrices;//games.pskinsprices.split('/');
        var pskinsNames = cskinsNames;//temp.split('/');    
        var totalSkins = games.cskins ;//+ games.pskins;
        if(games.winner == -1 && games.timer11 == '0')
        {
            td2 += cskinsImages.length + ' items<br>';
        }
        else
        {
            td2 += totalSkins + ' items<br>';
        }

        td2 += '<div id="Skinss">';
        var allSkinsImages = cskinsImages;//.concat(pskinsImages);
        var allSkinsPrices = cskinsPrices;//.concat(pskinsPrices);
        var allSkinsNames = cskinsNames;//.concat(pskinsNames);

        var more = 0;

        if(games.winner == -1 && games.timer11 == '0')
        {
            var items = [];
            for(var i = 0; i < cskinsNames.length; i++)
            {
                items.push({
                    name: cskinsNames[i],
                    price: cskinsPrices[i],
                    url: cskinsImages[i]
                });
            }

            items.sort(compare);

            function compare(a,b) {
                if (a.price > b.price)
                  return -1;
                if (a.price < b.price)
                  return 1;
                return 0;
            }

            for(var i = 0; i < items.length; i++)
            {
                if(i < 5)
                {
                    td2 += '<img style="border: 1px solid rgba(15, 16, 16, 0.2);" title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="' + items[i].url + '/70fx50f">';
                }
                else
                {
                    more++;
                }
            }

            if(more > 0)
            {
                td2 += '+' + more + ' more';
            }
        }
        else
        {
            var items = [];
            for(var i = 0; i < totalSkins; i++)
            {
                items.push({
                    name: allSkinsNames[i],
                    price: allSkinsPrices[i],
                    url: allSkinsImages[i]
                });
            }

            items.sort(compare);

            function compare(a,b) {
                if (a.price > b.price)
                  return -1;
                if (a.price < b.price)
                  return 1;
                return 0;
            }

            for(var i = 0; i < items.length; i++)
            {
                if(i < 5)
                {
                    td2 += '<img style="border: 1px solid rgba(15, 16, 16, 0.2);" title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="' + items[i].url + '/70fx50f">';
                }
                else
                {
                    more++;
                }
            }

            if(more > 0)
            {
                td2 += '+' + more + ' more';
            }
        }

        td2 += '</div>';
        //TEXTDRAW3
        var totalSkins = games.ctp + games.ptp;
        td3 = '$' + parseFloat(totalSkins).toFixed(2);
        //TEXTDRAW4
        td4 = '';
        td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ',1)" value="View" readonly />';
    }

    if(games.cemail && !games.pemail)
    {
        //TEXTDRAW1
        td1 = '<img title="' + games.cname + '" width="40px" height="40px" src="/uploads/' + games.cavatar + '">';
        //TEXTDRAW2
        // var cskinsImages = games.cskinsurl.split('/');
        // var temp = games.cskinsnames;
        // while(temp.indexOf('##') != -1)
        //  {
        //     temp = temp.replace("##","★");
        //  }
        // var cskinsNames = temp.split('/');
        // var cskinsPrices = games.cskinsprices.split('/');

        var totalSkins = games.cskins;

        td2 += totalSkins + ' items<br>';

        td2 += '<div id="Skinss">';
        var more = 0;

        var items = [];
        for(var i = 0; i < totalSkins; i++)
        {
            items.push({
                name: cskinsNames[i],
                price: cskinsPrices[i],
                url: cskinsImages[i]
            });
        }

        items.sort(compare);

        function compare(a,b) {
            if (a.price > b.price)
              return -1;
            if (a.price < b.price)
              return 1;
            return 0;
        }

        for(var i = 0; i < totalSkins; i++)
        {
            if(i < 5)
            {
                td2 += '<img style="border: 1px solid rgba(15, 16, 16, 0.2);" title="' + items[i].name + ' - $' + items[i].price + '" price="' + items[i].price + '" src="' + items[i].url + '/70fx50f">';
            }
            else
            {
                more++;
            }
        }
        if(more > 0)
        {
            td2 += '+' + more + ' more';
        }
        td2 += '</div>';
        //TEXTDRAW3
        var calculate = 10/100*games.ctp;
        var Gap01 = games.ctp - calculate;
        var Gap02 = games.ctp + calculate;
        NeedsG01 = Gap01;
        NeedsG02 = Gap02;
        td3 = '$' + games.ctp + '<br>';//Needs: $' + parseFloat(Gap01).toFixed(2) + ' - ' + parseFloat(Gap02).toFixed(2);
        //TEXTDRAW4
        td4 = '<input class="btn duel-btn-succes" id="cfJoinGame" onclick="joinGame(' + games.id + ', ' + parseFloat(NeedsG01).toFixed(2) + ', ' + parseFloat(NeedsG02).toFixed(2) + ')" value="Join" readonly />';
        td4 += '<i class="btn duel-btn-lg fa fa-eye" id="cfViewGame" onclick="watchGame(' + games.id + ',1)"></i>';
    }

    if(games.cemail && games.pemail && games.winner != '-1')
    {
        if(games.winner == 1)
        {
            setTimeout(function() {
                td4 = '<span id="Winner" class ="WinnerFadeIn"><img width="40px" height="40px" src="/uploads/' + games.cavatar + '"></span>';
                td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ',1)" value="View" readonly />';
                $('#td4-'+games.id).html(td4);
            }, 3000);

        }
        else if(games.winner == 2)
        {
            setTimeout(function() {
                td4 = '<span id="Winner" class ="WinnerFadeIn"><img width="40px" height="40px" src="/uploads/' + games.pavatar + '"></span>';
                td4 += '<input style="width:70px; margin: 0px 5px;" class="btn duel-btn-lg" id="cfViewGame" onclick="watchGame(' + games.id + ',1)" value="View" readonly />';
                $('#td4-'+games.id).html(td4);
            }, 3000);
        }
    }

    var td5 = '<div id="countdown'+games.id+'" style="width: 50px; height: 50px;"></div>';



    $('#td1-'+games.id).html(td1);
    $('#td2-'+games.id).html(td2);
    $('#td3-'+games.id).html(td3);
    $('#td4-'+games.id).html(td4);
    $('#td5-'+games.id).html(td5);

    if(games.pemail && games.winner == -1 && games.timer11 == '0')
    {
        $("#countdown"+games.id).countdown360({
            radius      : 20,
            seconds     : 90,
            fontColor   : '#FFFFFF',
            fillStyle   : '#fe634a',
            strokeStyle : '#dc393c',
            autostart   : false,
            label       : false,
            smooth      : true,
            onComplete  : function() {
                $('#countdown'+games.id).empty();
            }
        }).start();
    }
    
    if(games.pemail && games.timer11 != '0' && games.winner == '-1')
    {

        $("#countdown"+games.id).countdown360({
            radius      : 20,
            seconds     : games.timer11,
            fontColor   : '#FFFFFF',
            autostart   : false,
            label       : false,
            smooth      : true,
            onComplete  : function () {
                $('#countdown'+games.id).empty();
             console.log("EEEEEE");
                   
                 SOCKET.emit("getWinner",{id:games.id,price:games.ctp ,hash:getCookie('hash')});
                   // SOCKET.emit("winner",{email:email,id:,games.id,winner:win,price:games.ctp});
            }
        }).start()
    }
}

function tradeItems(tid)
{
    $.ajax({
        url: 'sendTrade?tid='+tid,
        success: function(data){
            if(data.success)
            {
                alert(data.msg);
                $.ambiance(data.msg);
            }
            else
            {
                alert(data.error);
                $.ambiance(data.error);
            }
        }
    });
}
