import {TextHelper} from "./textHelper";
import {Styles} from "../styles";
import {SketchObject} from "./sketch-object";

const TEXT_H_OFFSET = 3;

export class Label extends SketchObject {

  text: string;
  textHelper: TextHelper;
  assignedObject: SketchObject;
  offsetX: number;
  offsetY: number;

  constructor(text: string, assignedObject: SketchObject, id?: string) {
    super(id);
    this.text = text;
    this.assignedObject = assignedObject;
    this.textHelper = new TextHelper();
    this.offsetX = 0;
    this.offsetY = 0;
  }

  translateImpl(dx, dy) {
    this.offsetX += dx;
    this.offsetY += dy;
  }


  drawImpl(ctx, scale, viewer) {

    const m = this.assignedObject.labelCenter;

    if (!m) {
      return;
    }

    const marked = this.markers.length !== 0;

    if (marked) {
      ctx.save();
      viewer.setStyle(Styles.HIGHLIGHT, ctx);
    }
    const textOff = viewer.unscale * TEXT_H_OFFSET;


    this.textHelper.prepare(this.text, ctx, viewer);

    const h = this.textHelper.modelTextWidth/2;
    const rotX = 0, rotY = 1;
    const tx = (m.x + rotX * textOff) + (- rotY) * h + this.offsetX;
    const ty = (m.y + rotY * textOff) + (  rotX) * h + this.offsetY;
    this.textHelper.draw(tx, ty, rotX, rotY, ctx, viewer.unscale, viewer, textOff, true);

    if (marked) {
      ctx.restore();
    }
  }

  normalDistance(aim, scale) {
    return this.textHelper.normalDistance(aim);
  }

  write() {
    return {
      text: this.text,
      assignedObject: this.assignedObject.id,
      offsetX: this.offsetX,
      offsetY: this.offsetY
    }
  }

  static read(id, {text, assignedObject, offsetX, offsetY}, index) {
    const label = new Label(text, index[assignedObject], id);
    label.offsetX = offsetX;
    label.offsetY = offsetY;
    return label;
  }

  visitParams(callback) {
  }

  copy() {
    return new Label(this.text, this.assignedObject);
  }
}

Label.prototype._class = 'TCAD.TWO.Label';
Label.prototype.TYPE = 'Label';
