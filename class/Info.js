export class Info {
  inputs;
  form;
  data;
  err;
  agregar;

  constructor(inputs, form, data, err, agregar) {
    this.inputs = inputs;
    this.form = form;
    this.data = data;
    this.err = err;
    this.agregar = agregar;
  }
}
