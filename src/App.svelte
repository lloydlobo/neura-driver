<script lang="ts">
  // import logo from "./assets/svelte.png";
  // import Counter from "./lib/Counter.svelte";
</script>

<main>
  <div class="app-wrapper">
    <canvas id="carCanvas" />
    <div id="verticalButtons" class="vertical-buttons">
      <button id="btnBrainSave">💾</button>
      <button id="btnBrainDiscard">🗑️</button>
    </div>
    <canvas id="networkCanvas" />
  </div>

  <!-- <img src={logo} alt="Svelte Logo" />
  <h1>Hello Typescript!</h1>

  <Counter />

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p> -->
</main>

<style>
  .app-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* // align-items: center; */
    min-height: 100vh;
    /* // height: 100%; */
    /* // width: 100%; */
  }

  .vertical-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    border: none;
    border-radius: 5px;
    padding-block-start: 5px;
    padding-block-end: 7px;
    padding-inline: 5px;
    margin: 2px;
    cursor: pointer;
    /* // background: none; */
  }

  button:hover {
    background: blue;
  }

  /* // .canvas__wrapper {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-inline: auto;
// } */

  #carCanvas {
    background: lightgray;
  }

  #networkCanvas {
    background: black;
  }
</style>
