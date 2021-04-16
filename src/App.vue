<template>
  <div id="app">
    <div class="content">
      <section class="choosen-output">
        <label class="choosen-text"> Поточний шлях:  {{
          $store.state.currentActivePath.join(" ,") || "*Ієрархія шляху*"
        }}</label>
        <br>
        <label class="choosen-text"> Обраний елемент:  {{
          $store.state.choosenPath.join(" ,") || "*Ієрархія обраного елемента*"
        }}</label>
      </section>

      <section class="accordion">

        <article>
      <Constructor
        :generalTitle="'Апельсини'"
        :mainTitles="[['Турція'], ['Іспанія'], ['Туніс']]"
        :childTitles="[
          ['Великі', 'Середні', 'Маленькі'],
          ['Середні', 'Великі'],
          ['Середні', 'Маленькі'],
        ]"
        :name="'oranges'"
      />
      </article>
      
      <article>
      <Constructor
        :generalTitle="'Яблука'"
        :mainTitles="[['Україна'], ['Польша']]"
        :childTitles="[
          ['Голден', 'Гала'],
          ['Голден', 'Кальвін'],
        ]"
        :name="'apples'"
      />
      </article>
      </section>
    </div>
  </div>
</template>

<script>
import Constructor from "./components/Acardion-item.vue";

export default {
  name: "app",
  data() {
    return {
    };
  },
  components: {
    Constructor,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto:wght@300&display=swap');

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
  margin: 0 auto;
  width: 80%;
  height: 100%;
  border: 1px solid #000;
  background-color: #292550;
}
.choosen-text {
  border-bottom: 3px solid #a8acd0;
  font-size: 2.5rem;
  font-family: 'Lato', sans-serif;
}
.choosen-output {
  margin: 3vw 9vw 0 13vw;
  max-width: fit-content;

  max-height: 50px;
  position: absolute;
}
/* #oranges {
  background-image: url("https://thenationpress.net/en/imgs/2020/08/1597490497blobid0.jpg");
  background-size: 100% 100%;
  opacity: 65%;
}
#apples {
  background-image: url("https://vilee.fi/eng/wp-content/uploads/2020/11/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549-1.jpg");
  background-size: 100% 100%;
  opacity: 65%;
} */
.accordion {
  align-self: center;
  margin-top: 5vw;
  display: flex;
  
  flex-direction: column;
}
body {
  box-sizing: border-box;
}
</style>
