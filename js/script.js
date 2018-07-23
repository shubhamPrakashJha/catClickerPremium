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
        adminVisible: null
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
            var cat = model.currentCat;
            this.$newName = $("#newName");
            this.$newImgUrl = $("#newImgUrl");
            this.$newClicksCount = $("#newClicksCount");
            this.$newName.attr("placeholder",cat.name);
            this.$newImgUrl.attr("placeholder",cat.imgUrl);
            this.$newClicksCount.attr("placeholder",cat.clicksCount);
            $("#changeInfoForm").show();
            model.adminVisible = true;
        },
        closeAdminView: function () {
            $("#changeInfoForm").hide();
            model.adminVisible = false;
        },
        updateValue: function () {
            var currentCat = this.getCurrentCat();
            var newName = this.$newName;
            var newImgUrl = this.$newImgUrl;
            var newClicksCount = this.$newClicksCount;
            if(newName.val()){
                currentCat.name = newName.val();
                newName.val("");
            }else if(newImgUrl.val()){
                currentCat.imgUrl = newImgUrl.val();
                newImgUrl.val("");
            }else if(newClicksCount.val()){
                currentCat.clicksCount = newClicksCount.val();
                newClicksCount.val("")
            }
            view_list.render();
            view_cats.render();
            view_admin.render();
        }

    };

    var view_list = {
        init: function () {
            this.catList = $(".cat_list");
            this.catList.on("click","li",function () {
                var catId = $(this).index();
                controller.setCurrentCat(catId);
            });

            this.render();
        },
        render: function () {
            var catList = this.catList,
                catNames = controller.getAllCats();

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
            controller.closeAdminView();
            $("#name").text(currentCat.name);
            $("#clicksCount").text(currentCat.clicksCount);
            $("#imgUrl").attr("src",currentCat.imgUrl);
        }
    };

    var view_admin = {
        init : function () {
            $("#admin").click(function () {
                view_admin.render();
            });
            $("#cancel").click(function () {
                controller.closeAdminView();
            });
            $("#submit").click(function () {
                controller.updateValue();
                controller.closeAdminView();
            })
        },
        render : function () {
            if(!model.adminVisible){
                controller.openAdminView();
            }else {
                controller.closeAdminView();
            }
        }
    };


    controller.init();
});
