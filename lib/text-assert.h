#ifndef NDEBUG
#include <stdio.h>

void __assert_func(const char *filename, int line, const char *assert_func, const char *expr ) {
  char buf[512];
  REG_DISPCNT = DCNT_MODE0 | DCNT_BG0;
  tte_init_se_default(0, BG_CBB(0) | BG_SBB(31));
  sprintf(buf, "Assert failed\n%s\n%s:%i\n%s", expr, filename, line, assert_func);
  tte_write(buf);
  while(1);
};
#endif
