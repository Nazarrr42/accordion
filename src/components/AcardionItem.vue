<template>
  <div class="all-tabs">
    <div class="main-tab">
      <label class="tab-title main" :id="name" @click.stop="mainClick()"
        ><i class="fas fa-apple-alt" v-if="name == 'apples'"></i>
        <!-- Обираємо іконку в залежності від унікального імені елементу акордеона. Показуємо вид іконки в залежності від змінної-->
        <i class="fas fa-lemon" v-if="name == 'oranges'"></i>{{ mainTitle }}
        <!-- Ім'я першого блоку -->
        <i class="fas fa-angle-down icon" v-show="!firstCheck" :id="name"></i>
        <!-- Обираємо іконку в залежності від унікального імені елементу акордеона. Показуємо вид іконки в залежності від змінної   -->
        <i class="fas fa-angle-up icon" v-show="firstCheck" :id="name"></i
      ></label>
      <div class="main-tab-content" v-if="firstCheck">
        <!-- В залежності від змінної відображаємо другі блоки-->
        <div
          v-for="(childItem, i) in childTitles"
          :key="i"
          class="child-tab-content"
        >
          <label
            class="tab-title child"
            :id="i"
            @click.stop="childClick(`lastItem-${i}`, childItem)"
          >
            <!-- Створюємо унікальний id для третіх блоків за допомогою "lastItem-" + поточний індекс масиву -->
            {{ childItem
            }}<i
              class="fas fa-angle-down icon"
              v-show="!secondCheck.includes(`lastItem-${i}`, 0)"
              :id="i"
            ></i>
            <!-- Показуємо вид іконки в залежності від наявності в масиві уникального id, це допомогає нам відрізняти другі блоки та не показувати один тип іконок   -->
            <i
              class="fas fa-angle-up icon"
              v-show="secondCheck.includes(`lastItem-${i}`, 0)"
              :id="i"
            ></i
          ></label>

          <!-- Відображаємо третій блок в залежності від наявності унікального id в масиві-->
          <div
            class="last-tab-content"
            v-if="secondCheck.includes(`lastItem-${i}`, 0)"
          >
            <div
              v-for="(lastItem, index) in lastTitles[i]"
              :key="index"
              class="last-tab-elem"
            >
              <!-- Створюємо унікальний id для опції третього блоку, аби задати ій клас по ньому та відобразити як кінцевий шлях -->
              <span
                :id="name + '-' + i + '-' + index"
                :class="{
                  active:
                    $store.state.currentActiveEl ===
                    name + '-' + i + '-' + index,
                }"
                @click="
                  activate(name + '-' + i + '-' + index, [childItem, lastItem])
                "
                >{{ lastItem }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AcordionItem",
  props: {
    mainTitle: {
      // Передаєтся строка, яка буде назвою першого блоку(main) акордеону
      Type: String,
      default: "None",
    },
    childTitles: {
      // Передаєтся масив, який має в собі назви других блоку(child) акордеону
      Type: Array,
      default: ["None"],
    },
    lastTitles: {
      // Передаєтся масив масивів, в яких в залежності від іднексу зберігаєтся назви третіх блоків(last) акордеону
      Type: Array,
      default: ["None"],
    },
    name: {
      // спеціальне ім'я коструктора, щоб якось іх розрізняти
      Type: String,
      required: true,
    },
  },
  data() {
    return {
      firstCheck: false, // Змінна, в якій true - перший блок(main) акордеону відкритий, false - перший блок акордеону закритий
      secondCheck: [], // Массив відкритих елементів другого блоку(child) акордеону
    };
  },
  methods: {
    mainClick() {
      // Клік по початковому блоку акордеону
      if (this.firstCheck) {
        // перевірка "відкритий" блок чи "закритий"
        this.firstCheck = false;
        this.$store.commit("setZeroPathLvL"); // Якщо блок був "відкритий", то закриваємо його і змінюємо поточниу ієрархію на нульову
      } else {
        this.firstCheck = true;
        this.$store.commit("setFirstPathLvL", [this.mainTitle]); // Якщо блок був "закритий", то відкриваємо його і змінюємо поточниу ієрархію на назву поточного початкового блоку акордеона
      }
    },
    childClick(itemName, path) {
      // Приймаємо спеціальний id елементу та його ім'я його блоку
      if (this.secondCheck.includes(itemName)) {
        // По спеціальному id перевіряємо його присутність в масиві відкритих блоків
        this.secondCheck = this.secondCheck.filter((item) => item != itemName);
        this.$store.commit("setFirstPathLvL", [this.mainTitle]); // Якщо був "відкритий", то закриваємо його(фільтруючи з масиву) і змінюємо поточниу ієрархію на на назву поточного початкового блоку акордеона
      } else {
        this.secondCheck.push(itemName);
        this.$store.commit("setSecondPathLvL", [this.mainTitle, path]); // Якщо був "закритий", то відкриваємо його(додаючи до масиву) і змінюємо поточниу ієрархію на на назву поточного початкового блоку акордеона
      }
    },
    activate(uniqID, path) {
      // Приймаємо унікальний id та назву другого та третього блоку

      this.$store.commit("setCurrentActiveEl", uniqID); // Привласнюємо цей id активному елементу, за допомогою якого буде опреділено поточний активний елемент

      path.unshift(this.mainTitle); // Додаємо до ієрархії назву першого блоку
      this.$store.state.choosenPath = path; // Привласнюємо кінцевій ієрархії кінцевий шлях
      this.$store.commit("setLastPathLvL", path); // Привласнюємо поточній ієрархії кінцевий шлях
    },
  },
};
</script>

<style>
.all-tabs {
  /* Весь блок загалом */
  display: block;
  margin-top: 5px;
}
.main-tab {
  /* Блок-обгортка всього контенту */
  padding-bottom: 0.5vh;
  max-height: 100%;
  padding-right: 5px;
  display: flex;
}
.main-tab-content {
  /* Всі другі блоки */
  margin: 8px 0 0 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  cursor: pointer;
}
.child-tab-content {
  /* Кожен другий блок*/
  height: fit-content;
  display: block;
  margin-bottom: 1.7vw;
}
.tab-title {
  /* Загальна назва для першого та других блоків*/
  border: 2px solid #a8acd0;
  border-radius: 20% 0;
  cursor: pointer;
  max-height: 2.7vw;
  padding: 0.7vw;
}
.main {
  /* Приставка до загальної назви, яка виражає назву першого блоку*/
  font-size: 2.5rem;
  font-family: "Roboto", sans-serif;
  background-color: #ef7865;
}
.child {
  /* Приставка до загальної назви, яка виражає назву других блоків*/
  font-size: 1.5rem;
  background-color: #092f5d;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #fff;
}
.last-tab-content {
  /* Кожен третій блок*/
  padding: 0.5vw;
  margin-left: 0;
  margin-top: 3px;
  display: block;
  background-color: #ccc;
  border: 1px solid #b0b0b0;
  width: 100%;
  max-width: fit-content;
}
.last-tab-elem {
  /* Кожен елемент в середині треього блоку*/
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #b0b0b0;
  font-family: "Robot", sans-serif;
  cursor: pointer;
  width: 100%;
}
.last-tab-elem:hover {
  background-color: #092f5d;
  color: #fff;
}
.icon {
  display: inline-block;
  margin-left: 7px;
}
.active {
  background-color: #092f5d;
  color: #fff;
  font-style: italic;
}
@media (max-width: 2000px) {
  :root {
    font-size: 12px;
  }
}
@media (max-width: 1165px) {
  :root {
    font-size: 12px;
  }
}
@media (max-width: 1020px) {
  :root {
    font-size: 11px;
  }
}
@media (max-width: 876px) {
  :root {
    font-size: 9px;
  }
}
@media (max-width: 742px) {
  :root {
    font-size: 8px;
  }
}
@media (max-width: 650px) {
  :root {
    font-size: 6px;
  }
}
</style>
