import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DailyFeedbackService} from "../../services/daily-feedback.service";
import {SiteService} from "../../services/site.service";
import {TankService} from "../../services/tank.service";
import {TankProductService} from "../../services/tank-product.service";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {DailyFeedback} from "../../models/DailyFeedback";
import {Net} from "../../models/Net";
import {BehaviorSubject} from "rxjs";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-daily-feedback',
  templateUrl: './daily-feedback.component.html',
  styleUrls: ['./daily-feedback.component.css']
})
export class DailyFeedbackComponent implements OnInit {

  // dailyFeedbackForm: any;
  submitted = false;
  dailyFeedbackForm: FormGroup;
  loadingObserver!: BehaviorSubject<boolean>;
  dfFormSubmitted: boolean = false;
  status: string | undefined
  user: User;

  @ViewChild(ToastContainerDirective, {static: true})
  public toastContainer!: ToastContainerDirective;

  constructor(public dailyFeedbackService: DailyFeedbackService, public siteService: SiteService, public tankService: TankService, public tankProductService: TankProductService,
              private toastr: ToastrService, public router: Router, public dialog: MatDialog, public formBuilder: FormBuilder,
              public userService: UserService, private activatedRoute: ActivatedRoute) {
    this.user = new User();
    this.dailyFeedbackForm = this.formBuilder.group({
      sideID: new FormControl(siteService.site.id, [Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/)]),
      tankID: new FormControl(dailyFeedbackService.dailyFeedback.tankID, [Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/)]),
      productID: new FormControl(dailyFeedbackService.dailyFeedback.productID, [Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/)]),
      netID: new FormControl(tankService.net),
      qtyAlmt09AM: new FormControl(dailyFeedbackService.dailyFeedback.qtyAlmt09AM, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      qtyAlmt12PM: new FormControl(dailyFeedbackService.dailyFeedback.qtyAlmt12PM, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      qtyAlmt03PM: new FormControl(dailyFeedbackService.dailyFeedback.qtyAlmt03PM, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nbMale: new FormControl(dailyFeedbackService.dailyFeedback.nbMale, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nbFemale: new FormControl(dailyFeedbackService.dailyFeedback.nbFemale, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      temp06AM: new FormControl(dailyFeedbackService.dailyFeedback.temp06AM, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      temp03PM: new FormControl(dailyFeedbackService.dailyFeedback.temp03PM, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      oxyg03PM: new FormControl(dailyFeedbackService.dailyFeedback.oxyg03PM, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      oxyg06AM: new FormControl(dailyFeedbackService.dailyFeedback.oxyg06AM, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      nh3: new FormControl(dailyFeedbackService.dailyFeedback.nh3, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      nh2: new FormControl(dailyFeedbackService.dailyFeedback.nh2, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      ph: new FormControl(dailyFeedbackService.dailyFeedback.ph, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      remark: new FormControl(dailyFeedbackService.dailyFeedback.remark, Validators.required)
    })
  }

  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
    const param = this.activatedRoute.snapshot.queryParams.feedback;
    if(param){
      this.dailyFeedbackService.dailyFeedback = JSON.parse(param as string);
    }
    this.loadAllSites();
    this.loadProducts();
    this.getStatus();
    this.loadFeedBacks();
  }

  openDialog(status: string, message: string, mode: string, nb?: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {loading: this.loadingObserver, status: status, message: message, mode, nb}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  loadAllSites() {
    this.siteService.getAll().subscribe((res) => {
      this.siteService.sites = res;
      if (this.dailyFeedbackService.dailyFeedback.id) {
        this.tankService.getByID(this.dailyFeedbackService.dailyFeedback.tankID).subscribe((res => {
          this.siteService.getByID(res.id).subscribe((res1) => {
            this.siteService.site = res1;
            this.tankProductService.getByID(this.dailyFeedbackService.dailyFeedback.productID).subscribe((r) => {
              this.dailyFeedbackService.tankProduct = r;
            })
            this.loadNets(this.dailyFeedbackService.dailyFeedback.tankID);
          })
        }));
      }
    })
  }

  loadFeedBacks() {
    this.dailyFeedbackService.getAll().subscribe((res) => {
      this.dailyFeedbackService.dailyFeedbacks = res;
    })
  }

  getStatus() {
    if(this.dailyFeedbackService.dailyFeedback.id) {
      this.dailyFeedbackService.getByDaily_feedbackID(this.dailyFeedbackService.dailyFeedback.id).subscribe((res) => {
        this.status = res.status;
        this.userService.getUserByID(res.userID as number).subscribe((user) => {
          this.user = user;
        })
      })
    }
  }

  loadTanks(id: number) {
    this.tankService.getBySite(id).subscribe((res) => {
      this.tankService.tanks = res;
    })
  }

  loadNets(id: number) {
    this.tankService.getByNetByTankID(id).subscribe((res) => {
      this.tankService.nets = res;
      for (let net of this.tankService.nets) {
        if (net.tankID === this.dailyFeedbackService.dailyFeedback.tankID) {
          this.tankService.net = net;
        }
      }
    })
  }

  loadProducts() {
    this.tankProductService.getAll().subscribe((res) => {
      this.tankProductService.tankProducts = res;
    })
  }

  async save(data: any, action: string) {
    console.log(data);
    console.log(this.dailyFeedbackService.dailyFeedback);
    this.dfFormSubmitted = true;

    if(action === "submit") {
      this.dailyFeedbackService.dailyFeedback.submitted = true;
    }

    if (this.dailyFeedbackForm.valid) {

      this.loadingObserver = new BehaviorSubject<boolean>(true);
      await this.openDialog("", "", "indeterminate");
      if (!this.dailyFeedbackService.dailyFeedback.id) {
        this.dailyFeedbackService.create(this.userService.currentUserValue).subscribe(async (res) => {
          if (res.status == "Success") {
            this.closeDialog();
            await this.openDialog(res.status, res.message, "indeterminate");
            this.router.navigate(['home'], {replaceUrl: true});
          } else {
            this.toastr.error(res.message);
            this.closeDialog();
            await this.openDialog(res.status, res.message, "indeterminate");
          }
        });
        this.dfFormSubmitted = false;
      } else {
        this.dailyFeedbackService.update(this.userService.currentUserValue, this.dailyFeedbackService.dailyFeedback.id).subscribe(async (res) => {
          if (res.status == "Success") {
            this.closeDialog();
            await this.openDialog(res.status, res.message, "indeterminate");
          } else {
            this.toastr.error(res.message);
            this.closeDialog();
            await this.openDialog(res.status, res.message, "indeterminate");
          }
          this.dfFormSubmitted = false;
        });
      }
    }
  }

  calculCumul() {
    let cumul = 0;
    this.dailyFeedbackService.dailyFeedbacks.forEach(df => {
      cumul += df.quantity;
    })
    cumul += this.dailyFeedbackService.dailyFeedback.quantity;
    this.dailyFeedbackService.dailyFeedback.cumulAlmt = cumul;
  }

  calculQty() {
    let qty = 0;
    qty += parseInt(this.dailyFeedbackForm.controls['qtyAlmt09AM'].value) + parseInt(this.dailyFeedbackForm.controls['qtyAlmt03PM'].value) + parseInt(this.dailyFeedbackForm.controls['qtyAlmt12PM'].value);
    this.dailyFeedbackService.dailyFeedback.quantity = qty;
    this.calculCumul();
  }

  calculQty1(form: any) {
    console.log(form);
    console.log(this.dailyFeedbackService.dailyFeedback);
    this.calculQty();
  }

  loadTankProduct(productID: number) {
    this.tankProductService.getByID(productID).subscribe((res) => {
      this.dailyFeedbackService.tankProduct = res;
    })
  }

  public goToList() {
    this.router.navigate(['home'], {replaceUrl: true});
  }

}
