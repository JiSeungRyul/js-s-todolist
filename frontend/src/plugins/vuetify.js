// import 'vuetify/styles';
// import { createVuetify } from 'vuetify';
// import { mdi } from 'vuetify/iconsets/mdi';

// const vuetify = createVuetify({
//   icons: {
//     defaultSet: 'mdi',
//     sets: {
//       mdi,
//     },
//   },
// });

// export default vuetify;

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;