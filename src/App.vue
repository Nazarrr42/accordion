<template>
  <div id="app">
    <div class="content">
      <div class="choosen-output">
        <label class="choosen-text">
          Поточний шлях:
          <span
            :class="{ 'choosen-path': $store.state.currentActivePath.length }"
          >
            {{
              $store.state.currentActivePath.join(" ,") || "*Ієрархія шляху*"
            }}</span
          ></label
        >
        <br />
        <label class="choosen-text">
          Обраний елемент:
          <span :class="{ 'choosen-path': $store.state.choosenPath.length }">{{
            $store.state.choosenPath.join(" ,") ||
              "*Ієрархія обраного елементу*"
          }}</span></label
        >
      </div>

      <div class="accordion">
        <!-- AcordionItem - це конструктор-елемент, за допомогою якого можна зручно створювати акордиони з впдаючим рівнем до трьох блоків -->
        <!-- Цей елемент приймає в себе: mainTitles - назва першого головного блоку, childTitles - масив, в якому зберігаються назви других дочірніх блоків,
         lastTitles - масив масивів, в якому зберігаються назви третіх останніх блоків, згідно з індексом вони є контентом других дочірніх блоків, name - унікальний "ярлик", за допомогою якого ми можемо відрізняти елементи та наприклад окремо їх стилізувати -->
        <AcordionItem
          :mainTitle="'Апельсини'"
          :childTitles="['Турція', 'Іспанія', 'Туніс']"
          :lastTitles="[
            ['Великі', 'Середні', 'Маленькі'],
            ['Середні', 'Великі'],
            ['Середні', 'Маленькі'],
          ]"
          :name="'oranges'"
        />

        <AcordionItem
          :mainTitle="'Яблука'"
          :childTitles="['Україна', 'Польша']"
          :lastTitles="[
            ['Голден', 'Гала'],
            ['Голден', 'Кальвін'],
          ]"
          :name="'apples'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AcordionItem from "./components/AcardionItem.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    AcordionItem,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Roboto:wght@300&display=swap");

#app {
  margin: 0;
  width: 100%;
  height: 100vh;
  background-color: #a8acd0;
  border: 3px dashed black;
}

.content {
  display: flex;
  justify-content: center;
  width: 80%;
  height: 100%;
  margin: 0 auto;
  border-radius: 20%/20%;
  background: #292550;
  position: relative;
}

.content::before,
.content::after {
  content: "";
  position: absolute;
  z-index: -1;
}

.content::before {
  border-radius: 2%/30%;
  top: 30px;
  bottom: 30px;
  right: -2px;
  left: -2px;
}

.content::after {
  border-radius: 30%/2%;
  left: 30px;
  right: 30px;
  top: -2px;
  bottom: -2px;
}

.choosen-text {
  border-bottom: 3px solid #a8acd0;
  font-size: 2.5rem;
  font-family: "Lato", sans-serif;
  color: #ccc;
}
.choosen-output {
  margin: 3vw 9vw 0 13vw;
  max-width: fit-content;

  max-height: 50px;
  position: absolute;
}
.choosen-path {
  background: repeating-linear-gradient(
    -45deg,
    #111111 0%,
    #969696 7.14%,
    rgb(20, 20, 20) 14.28%,
    rgb(17, 17, 17) 21.4%,
    rgb(22, 22, 22) 28.56%,
    #7e7e7e 35.7%,
    #1f1f1f 42.84%,
    #161616 50%
  );
  background-size: 600vw 600vw;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  animation: slide 8s linear infinite forwards;
}
@keyframes slide {
  0% {
    background-position-x: 0%;
  }
  100% {
    background-position-x: 600vw;
  }
}
.accordion {
  align-self: center;
  margin-top: 5vw;
  display: flex;

  flex-direction: column;
}
body {
  box-sizing: border-box;
  margin: 0;
}
</style>
