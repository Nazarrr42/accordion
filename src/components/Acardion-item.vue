<template>
  <div>
    <div
      class="main-tab"
      :class="{ opened: firstCheck.includes('firstLvL', 0) }"
      @click="generalBox($event, name, 'firstLvL', generalTitle)"
    >
      <label class="tab-title general" :class="{ name: !!name }" :id="name"
        >{{ generalTitle }}<i class="fas fa-angle-down icon" :id="name"></i
      ></label>
      <div class="main-tab-content" v-if="firstCheck.includes('firstLvL', 0)">
        <div
          v-for="(childItem, i) in mainTitles"
          :key="i"
          @click="childBox($event, i, `firstLvL-${i}`, childItem[0])"
          class="child-tab-content"
          :class="{ opened: secondCheck.includes(`firstLvL-${i}`, 0) }"
        >
          <label class="tab-title child" :id="i"
            >{{ childItem[0] }}<i class="fas fa-angle-down icon" :id="i"></i
          ></label>
          <div
            class="deeper-tab-content"
            v-if="secondCheck.includes(`firstLvL-${i}`, 0)"
          >
            <!-- (div.child-tab>input:checkbox+label+div.tab-content)*3 -->
            <div
              v-for="(lastItem, index) in childTitles[i]"
              :key="index"
              class="deeper-tab-elem"
            >
              <span
                class="deeper-tab-elem"
                :id="name + '-' + i + '-' + index"
                :class="{
                  active:
                    $store.state.currentActiveEl ===
                    name + '-' + i + '-' + index,
                }"
                @click="activate($event, [childItem[0], lastItem])"
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
  name: "Constructor",
  props: {
    generalTitle: {
      Type: String,
      default: "None",
    },
    mainTitles: {
      Type: Array,
      default: ["None"],
    },
    childTitles: {
      Type: Array,
      default: ["None"],
    },
    name: {
      Type: String,
      required: true,
    },
  },
  data() {
    return {
      firstCheck: [],
      secondCheck: [],
    };
  },
  methods: {
    generalBox(e, targetID, lvl, path) {
      let target = e.target.id;
      // let path = e.srcElement.innerText;
      if (target == targetID) {
        e.stopPropagation();
        e.preventDefault();
        console.log(target);
        if (this.firstCheck.includes(lvl)) {
          this.firstCheck = this.firstCheck.filter((item) => item != lvl);
          this.$store.commit("setZeroPathLvL");
        } else {
          this.firstCheck.push(lvl);
          this.$store.commit("setFirstPathLvL", [path]);
        }
      } else {
        return;
      }
    },
    childBox(e, targetID, lvl, path) {
      let target = e.target.id;
      // let path = e.srcElement.innerText;
      console.log(e.srcElement.innerText);
      if (target == targetID) {
        e.stopPropagation();
        e.preventDefault();
        if (this.secondCheck.includes(lvl)) {
          this.secondCheck = this.secondCheck.filter((item) => item != lvl);
          this.$store.commit("setFirstPathLvL", [this.generalTitle]);
        } else {
          this.secondCheck.push(lvl);
          this.$store.commit("setSecondPathLvL", [this.generalTitle, path]);
        }
      } else {
        return;
      }
    },
    activate(e, path) {
      let target = e.target.id;

      // this.currentActive = target;
      this.$store.state.currentActiveEl = target;

      path.unshift(this.generalTitle);
      this.$store.state.choosenPath = path;
      this.$store.commit("setLastPathLvL", path);
      console.log(e);
    },
  },
  mounted() {},
};
</script>

<style>
.main-tab {
  /* margin-bottom: 2vh; */
  padding-bottom: 0.5vh;
  max-height: 100%;
  padding-right: 5px;
  display: flex;
  box-sizing: content-box;
}
.main-tab-content {
  margin: 1vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  max-height: 1vh;
}
.child-tab-content {
  height: fit-content;
  display: block;
  margin-bottom: 15px;
}
.tab-title {
  border: 2px solid #a8acd0;
  /* rgba("0","0","0","0.1") ; */
  /* font-weight: bold; */
  max-height: 55px;
  padding: 0.5vw;
}
.general {
  font-size: 3rem;
  font-family: "Roboto", sans-serif;
  background-color: #ef7865;
}
.tab-title.general::before {
  content: "";
  display: inline-block;
  /* background-image: ;
  background-size: 100% 100%; */
}
.child {
  font-size: 2rem;
  background-color: #092f5d;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #fff;
}
/* .tab-title::after {
  content: "";
  background-image: url(../assets/long-arrow-down.png);
  display: inline-block;

  width: 20px;
  height: 15px;
  background-size: 100% 100%;
}
.opened > .tab-title::after {
  content: "";
  background-image: url(../assets/long-arrow-up.png);
  display: inline-block;

  width: 20px;
  height: 15px;

  background-size: 100% 100%;
} */
.child-tab-content.opened {
  margin-bottom: 2vh;
}
.deeper-tab-content {
  padding: 0.5vw;
  margin-left: 1vh;
  background-color: #ccc;
  border: 1px solid #b0b0b0;
  width: 100%;
  max-width: fit-content;
  /* display: inline-block;
  vertical-align: middle; */
}
.deeper-tab-elem {
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #b0b0b0;
  font-family: "Robot", sans-serif;
  cursor: pointer;
  width: 100%;
}
.deeper-tab-elem:hover {
  background-color: #092f5d;
  color: #fff;
}
.icon {
  display: inline-block;
  margin-left: 3px;
}
.active {
  background-color: blue;
}
@media (max-width: 1165px) {
  :root {
    font-size: 14px;
  }
}
@media (max-width: 1020px) {
  :root {
    font-size: 12px;
  }
}
@media (max-width: 876px) {
  :root {
    font-size: 10px;
  }
}
@media (max-width: 742px) {
  :root {
    font-size: 8px;
  }
}
</style>
