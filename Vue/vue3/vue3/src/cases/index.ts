// 创建vue应用实例
const app1 = createApp(App1);
const app2 = createApp(App2);
const app3 = createApp(App3);

const div1 = document.createElement("div1");
const div2 = document.createElement("div2");
const div3 = document.createElement("div3");

app1.mount("div1");
app2.mount("div2");
app3.mount("div3");

div1.appendChild(div1).appendChild("div2").appendChild(div3)

// 返回根组件实例
