function automaticTooltip(){
    var $getJson = new XMLHttpRequest();

    $getJson.open("GET","tooltip.json",true);
    $getJson.send();

    $getJson.onreadystatechange = function(){
        if ($getJson.readyState == 4){
            var $json = JSON.parse($getJson.response);
            var $keys = Object.keys($json);

            $keys.forEach(function($key){
                var $id = $json[$key]['id'];
                var $message = $json[$key]['message'];
                var $element = document.getElementById($id);

                if ($element){

                    var $oElement = $element;

                    if( typeof( $oElement.offsetParent ) != 'undefined' ) {
                        for( var $left = 0, $top = 0; $oElement; $oElement = $oElement.offsetParent ) {
                            $left += $oElement.offsetLeft;
                            $top  += $oElement.offsetTop;
                        }
                    } else{
                        var $left = $element.x;
                        var $top  = $element.y;
                    }

                    var $width = $element.offsetWidth;
                    $left = $left + $width + 4;

                    var $div = document.createElement("div");
                    var $content = document.createTextNode($message);
                    $div.className = "tooltip";
                    $div.appendChild($content);

                    $div.style.top = $top + "px";
                    $div.style.left = $left + "px";

                    $element.onmouseover = function(){
                        document.body.appendChild($div);
                    }

                    $element.onmouseout = function(){
                        document.body.removeChild($div);
                    }
                }
            });
        }
    }
}

automaticTooltip();
