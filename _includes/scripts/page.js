(function () {
            var a_idx = 0;
            jQuery(document).ready(function ($) {
                $("body").click(function (e) {
                    var a = new Array("❤记得好评哦❤", "❤记得打赏哦❤", "❤记得关注哦❤", "❤赞一个❤");
                    var $i = $("<span></span>").text(a[a_idx]);
                    a_idx = (a_idx + 1) % a.length;
                    var x = e.pageX,
                        y = e.pageY;
                    $i.css({
                        "z-index": 99,
                        "top": y - 20,
                        "left": x,
                        "position": "absolute",
                        "font-weight": "bold",
                        "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(
                                255 * Math.random()) + "," + ~~(255 * Math.random()) +
                            ")"
                    });
                    $("body").append($i);
                    $i.animate({
                            "top": y - 180,
                            "opacity": 0
                        },
                        1500,
                        function () {
                            $i.remove();
                        });
                });
            });
})();
