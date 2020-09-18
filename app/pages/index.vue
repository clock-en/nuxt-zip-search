<template>
  <main class="mdc-top-app-bar--fixed-adjust page-content">
    <div class="main">
      <ZipSearchResult :data="data" :is-submited="isSubmited" />
    </div>
    <div id="sidebar" class="sidebar">
      <ZipSearch @submitZipcode="fetchAddresses" />
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import axiosJsonp from 'axios-jsonp';
import ZipSearch from '~/components/organisms/ZipSearch';
import ZipSearchResult from '~/components/organisms/ZipSearchResult';

export default {
  components: {
    ZipSearch,
    ZipSearchResult,
  },
  data() {
    return {
      data: {},
      isSubmited: false,
    };
  },
  methods: {
    fetchAddresses(zipcode) {
      const url = 'https://zipcloud.ibsnet.co.jp/api/search';
      axios
        .get(url, {
          adapter: axiosJsonp,
          callbackParamName: 'callback',
          params: {
            zipcode: encodeURIComponent(zipcode),
            limit: 100,
          },
        })
        .then((response) => {
          this.data = response.data;
          this.isSubmited = true;
        })
        .catch(function () {
          alert('情報の取得に失敗しました。');
        });
    },
  },
};
</script>
