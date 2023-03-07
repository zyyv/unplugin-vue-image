<template>
  <div>
    <img alt="Vue logo" src="./assets/images/logo.png">
    <br>
    <img alt="Vue logo" :src="Logo">
    <img alt="Vue logo" :src="Abc">
  </div>
</template>

<style>
html,
body {
  background-color: #000;
}

div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
