/**
 * Created by sjonl on 15-06-2018.
 */
$(function () {

    var model = {
        cats : [{
            name: "cat1",
            clicksCount: 0,
            imgUrl: "img/cat1.jpg"
        }, {
            name: "cat2",
            clicksCount: 0,
            imgUrl: "img/cat2.jpg"
        }, {
            name: "cat1",
            clicksCount: 0,
            imgUrl: "img/cat3.jpg"
        }],
        currentCat : model.cats[0]
    };

    var controller = {
        init : function () {
            model.init();
            view_list.init();
            view_cats.init();
        },
        getAllcats : function () {
            var catNames = [];
            for(var i = 0; i <= model.cats.length; i++){
                catNames.push(model.cats[i].name);
            }
            return catNames;

        },
        getCurrentCat : function () {
            return model.currentCat;
        },
        changeCurrentCat : function (catId) {
            model.currentCat = model.cats[catId];
            view_cats.render();
        }


    };

    var view_list = {
        init : function () {
            this.catList = $(".cat_list");
            this.catNames = controller.getAllcats();
            view_list.render();
        },
        render : function () {
            var catList = this.catList,
                catNames = this.catNames;

            var htmlstr = '';
            for(var i = 0; i <= catNames.length; i++ ){
                htmlstr += "<li>"+catNames[i]+"</li>";
            }
            catList.html(htmlstr);
        }
    };
    var view_cats = {
        init: function () {
            this.cats = $(".cats");
            this.cats.on("click", "img", function () {
                var catId = $(this).siblings("#name").text()[3];
                controller.incrementClicks(catId-1);
            });

            view_cats.render();
        },
        render: function () {
            var currentCat = controller.getCurrentCat();
            $("#name").text(currentCat.name);
            $("#clicksCount").text(currentCat.clicksCount);
            $("#imgUrl").attr("src",currentCat.imgUrl);
        }
    };
    controller.init();
});
