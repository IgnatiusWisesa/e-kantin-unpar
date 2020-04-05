/* eslint-disable no-unused-vars */
// class component react
import React, { Component } from "react";
// react-router dom
import { Link, Redirect } from "react-router-dom";
// material-ui styles
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
// material-ui select
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import box
import Box from "@material-ui/core/Box";
// button color
import blue from "@material-ui/core/colors/blue";
import lightGreen from "@material-ui/core/colors/lightGreen";
import purple from "@material-ui/core/colors/purple";
// axios
import Axios from "axios";
// modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// input field
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// numeral
import numeral from "numeral";

class ManageMenus extends Component {
  state = {
    datamenu: [],
    loading: true,
    // modal tambah kantin
    modaladd: false,
    // add menu states starts
    addmenu: "",
    adddeskripsi: "",
    addcategory: "",
    addharga: "",
    // add menu states ends
    // edit menu states starts
    idedit: -1,
    indexedit: -1,
    modaledit: false,
    editmenu: "",
    editdeksripsi: "",
    editcategory: "",
    editharga: "",
    // edit menu states ends
  };

  componentDidMount() {
    Axios.get(`http://localhost:2020/menus?merchantid=${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ datamenu: res.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onClickSave = () => {
    let merchantid = this.props.match.params.id;
    let menu = this.state.addmenu;
    let deskripsi = this.state.adddeskripsi;
    let kategori = this.state.addcategory;
    let harga = this.state.addharga;

    let menubaru = {
      merchantid,
      menu,
      deskripsi,
      kategori,
      harga,
    };

    console.log(menubaru);

    Axios.post(`http://localhost:2020/menus`, menubaru)
      .then((res) => {
        console.log(res.data);
        Axios.get(`http://localhost:2020/menus?merchantid=${this.props.match.params.id}`)
          .then((res1) => {
            console.log(res1.data);
            this.setState({ datamenu: res1.data, modaladd: false });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickDelete = (id, index) => {
    console.log(id, index);

    Axios.delete(`http://localhost:2020/menus/${id}`)
      .then((res) => {
        console.log(res.data);
        Axios.get(`http://localhost:2020/menus?merchantid=${this.props.match.params.id}`)
          .then((res1) => {
            console.log(res1.data);
            this.setState({ datamenu: res1.data, modaladd: false });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickEdit = () => {
    // id dan index edit
    let id = this.state.idedit;
    let index = this.state.indexedit;

    let merchantid = this.props.match.params.id;
    let menu = this.state.editmenu || this.state.datamenu[index].menu;
    let deskripsi = this.state.editdeskripsi || this.state.datamenu[index].deskripsi;
    let kategori = this.state.editcategory || this.state.datamenu[index].kategori;
    let harga = this.state.editharga || this.state.datamenu[index].harga;

    let menuedit = {
      merchantid,
      menu,
      deskripsi,
      kategori,
      harga,
    };

    console.log(menuedit);

    Axios.put(`http://localhost:2020/menus/${id}`, menuedit)
      .then((res) => {
        console.log(res.data);
        Axios.get(`http://localhost:2020/menus?merchantid=${this.props.match.params.id}`)
          .then((res1) => {
            console.log(res1.data);
            this.setState({ datamenu: res1.data, modaledit: false });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  rendermenu = () => {
    return this.state.datamenu.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell style={{ width: "0px" }}>{index + 1}</TableCell>
          <TableCell style={{ width: "250px" }}>{val.menu}</TableCell>
          <TableCell style={{ width: "600px" }}>{val.deskripsi}</TableCell>
          <TableCell style={{ width: "100px" }}>{val.kategori}</TableCell>
          <TableCell style={{ width: "150px" }}>{"Rp." + numeral(val.harga).format("Rp,0.00")}</TableCell>
          <TableCell>
            <Box mb={1}>
              <Button
                onClick={() => this.setState({ idedit: val.id, indexedit: index, modaledit: true })}
                variant="outlined"
                style={{ width: "150px", color: purple.A200 }}>
                Edit Menu
              </Button>
            </Box>
            <Button
              onClick={() => {
                this.onClickDelete(val.id, index);
              }}
              variant="outlined"
              style={{ width: "150px" }}
              color="secondary">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="loading">Loading&#8230;</div>
        </div>
      );
    }

    return (
      <div>
        {this.state.modaladd ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={() => {
              this.setState({ modaladd: false });
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={true}>
              <div
                style={{
                  background: "white",
                  padding: "10px",
                  width: "500px",
                }}>
                <Box ml={20}>
                  <h2 id="transition-modal-title">Input Menu</h2>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ addmenu: e.target.value })}
                    label="Canteen's Menu"
                    style={{ margin: 4 }}
                    placeholder="Menu"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ adddeskripsi: e.target.value })}
                    label="Menu's Description"
                    style={{ margin: 4 }}
                    placeholder="Deskripsi"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <FormControl variant="outlined" style={{ margin: 4, minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-outlined-label">Menu's Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.addcategory}
                      onChange={(e) => this.setState({ addcategory: e.target.value })}
                      label="Menu's Category ">
                      {/* <MenuItem value="">
                                            <em>Kategori</em>
                                        </MenuItem> */}
                      <MenuItem value="makanan">Makanan</MenuItem>
                      <MenuItem value="minuman">Minuman</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ addharga: e.target.value })}
                    label="Menu's Price"
                    style={{ margin: 4 }}
                    placeholder="Harga"
                    fullWidth
                    margin="normal"
                    startAdornment={<InputAdornment position="start">Rp.</InputAdornment>}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box ml={20}>
                  <Button onClick={this.onClickSave} variant="outlined" style={{ width: "150px", color: blue.A200 }}>
                    Save
                  </Button>
                </Box>
              </div>
            </Fade>
          </Modal>
        ) : null}
        {this.state.modaledit ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={() => {
              this.setState({ modaledit: false });
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={true}>
              <div
                style={{
                  background: "white",
                  padding: "10px",
                  width: "500px",
                }}>
                <Box ml={20}>
                  <h2 id="transition-modal-title">Edit Menu</h2>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editmenu: e.target.value })}
                    label="Canteen's Menu"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datamenu[this.state.indexedit].menu}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editdeskripsi: e.target.value })}
                    label="Menu's Description"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datamenu[this.state.indexedit].deskripsi}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <FormControl variant="outlined" style={{ margin: 4, minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-outlined-label">Menu's Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.editcategory || this.state.datamenu[this.state.indexedit].kategori}
                      onChange={(e) => this.setState({ editcategory: e.target.value })}
                      label="Menu's Category ">
                      {/* <MenuItem value="">
                                            <em>Kategori</em>
                                        </MenuItem> */}
                      <MenuItem value="makanan">Makanan</MenuItem>
                      <MenuItem value="minuman">Minuman</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editharga: e.target.value })}
                    label="Menu's Price"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datamenu[this.state.indexedit].harga}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box ml={20}>
                  <Button onClick={this.onClickEdit} variant="outlined" style={{ width: "150px", color: purple.A200 }}>
                    Save
                  </Button>
                </Box>
              </div>
            </Fade>
          </Modal>
        ) : null}

        <Paper style={{ width: "100%" }}>
          <TableContainer style={{ maxHeight: 620 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Menu</TableCell>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>Harga</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Box mb={1} mt={1} style={{ paddingLeft: "42vh" }}>
                      <Button
                        component={Link}
                        to={"/admin/managemerchant"}
                        variant="outlined"
                        style={{ width: "150px", color: lightGreen.A700 }}>
                        Kembali
                      </Button>
                    </Box>
                    <Box mb={1} mt={1} style={{ paddingLeft: "42vh" }}>
                      <Button
                        onClick={() => {
                          this.setState({ modaladd: true });
                        }}
                        variant="outlined"
                        style={{ width: "150px", color: blue.A200 }}>
                        Tambah Menu
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
              <TableBody>{this.rendermenu()}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

export default ManageMenus;
