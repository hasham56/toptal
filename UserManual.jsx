import React from "react";
export function UserManual({
  openModal,
  capitalize,
  logoutBtn
}) {
  return <Grid lg={3} md={4} xs={10}>
          <Paper className="boder-rounded p-inline d-flex align-center justify-center m-inline card-height" elevation={3}>
            <Grid className="column-flex gp-60 align-center justify-center h-100" lgkui={12} sm={12}>
              <Button onClick={() => {
          openModal(true);
        }} variant="contained" color="primary">
                Add Item
              </Button>
              <div className="text-heading">Welcome</div>
              {capitalize(user.username)}

              <Button onClick={logoutBtn} variant="contained" color="primary">
                Logout
              </Button>
            </Grid>
          </Paper>
        </Grid>;
}
  