/**
 * Created by sjonl on 15-06-2018.
 */
$(function () {

    var model = {
        cats: [
            {
                name: "cat1",
                clicksCount: 0,
                imgUrl: "img/cat1.jpg"
            }, {
                name: "cat2",
                clicksCount: 0,
                imgUrl: "img/cat2.jpg"
            }, {
                name: "cat3",
                clicksCount: 0,
                imgUrl: "img/cat3.jpg"
            }
        ],
        currentCat: null,
        hiddenStatus: null
    };

    var controller = {
        init: function () {
            model.currentCat = model.cats[0];
            view_list.init();
            view_cats.init();
            view_admin.init();
        },
        getAllCats: function () {
            var catNames = [];
            for (var i = 0; i < model.cats.length; i++) {
                catNames.push(model.cats[i].name);
            }
            return catNames;

        },
        getCurrentCat: function () {
            return model.currentCat;
        },
        setCurrentCat: function (catId) {
            model.currentCat = model.cats[catId];
            view_cats.render();
        },
        incrementClicks : function () {
            model.currentCat.clicksCount++;
            view_cats.render();
        },
        openAdminView: function () {
            $("#changeInfoForm").show();
            model.hiddenStatus = false;
        },
        closeAdminView: function () {
            $("#changeInfoForm").hide();
            model.hiddenStatus = true
        }

    };

    var view_list = {
        init: function () {
            this.catList = $(".cat_list");
            this.catList.on("click","li",function () {
                var catId = $(this).index();
                controller.setCurrentCat(catId);
            });

            this.catNames = controller.getAllCats();
            this.render();
        },
        render: function () {
            var catList = this.catList,
                catNames = this.catNames;

            var htmlstr = '';
            for (var i = 0; i < catNames.length; i++) {
                htmlstr += "<li>" + catNames[i] + "</li>";
            }
            catList.html(htmlstr);
        }
    };
    var view_cats = {
        init: function () {
            this.cats = $(".cats");
            this.cats.on("click", "img", function () {
                controller.incrementClicks();
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

    var view_admin = {
        init : function () {
            controller.closeAdminView();
            $("#admin").click(function () {
                controller.openAdminView();
            });

        },
        render : function () {

        }
    };


    controller.init();
});
