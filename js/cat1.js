/*side bar */

function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}

/* json array*/
const bf = [{
        name: "樂活堡",
        address: "桃園市中壢區中央路208號",
        tel: "4203356",
        photo: "img/早餐/樂活.jpg"
    },

    {
        name: "拉亞",
        address: "桃園市中壢區中央大學女14舍B1",
        tel: "4201123",
        photo: "img/早餐/拉亞.jpg"
    },
    {
        name: "早安美芝城",
        address: "桃園市中壢區五興路331巷9號",
        tel: " 4908068",
        photo: "img/早餐/早安.jpg"

    },
    {
        name: "瑞麟美而美",
        address: "中壢市五興路331巷3號",
        tel: " 4207617",
        photo: "img/早餐/美而美.jpg"

    }

];

function Template(cstore) {
    return `
  <div class="item">
  <img class="photo" src="${cstore.photo}">
  <h2 class="store-name">${cstore.name}</h2>
  <span class="adr">${cstore.address}</span><br>
  <i class="fas fa-phone"></i><span class="tel"><a href="tel:+886-3-${cstore.tel}">03-${cstore.tel}</a></span>
  
  </div>
`;
}

document.getElementById("breakfast").innerHTML = `

${bf.map(Template).join("")}

`;

$(function() {
    /* 按下GoTop按鈕時的事件 */
    $('#gotop').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow'); /* 返回到最頂上 */
        return false;
    });

    /* 偵測卷軸滑動時，往下滑超過100px就讓GoTop按鈕出現 */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });
});