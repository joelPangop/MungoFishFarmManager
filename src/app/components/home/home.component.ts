import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DailyFeedbackService} from "../../services/daily-feedback.service";
import {SiteService} from "../../services/site.service";
import {DailyFeedback} from "../../models/DailyFeedback";
import {TankService} from "../../services/tank.service";
import {Tank} from "../../models/Tank";
import {TankProductService} from "../../services/tank-product.service";
import {TankProduct} from "../../models/TankProduct";
import {Site} from "../../models/Site";
import {Net} from "../../models/Net";
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject} from "rxjs";
import {DialogComponent} from "../dialog/dialog.component";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  dates: Set<any> = new Set();
  dailyFeedbacks: DailyFeedback[] = [];
  choosenDate!: string;
  public checkedDailyFb: number[] = [];
  loadingObserver!: BehaviorSubject<boolean>;
  listForm: FormGroup;

  constructor(private router: Router, public dailyFeedbackService: DailyFeedbackService, public siteService: SiteService, public tankService: TankService,
              public tankProductService: TankProductService, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.listForm = this.formBuilder.group({
      feedbacks: ['']
    });
  }

  ngOnInit(): void {
    this.dates = new Set();
    this.loadAllSites();
    this.loadFeedbacks();
    this.loadAllTanks();
    this.loadAllProducts();
    this.loadNets();
  }

  get ordersFormArray() {
    return this.listForm.controls.feedbacks as FormArray;
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

  ngAfterViewInit() {
    this.loadFeedbacks();
  }

  loadAllSites() {
    this.siteService.getAll().subscribe((res) => {
      this.siteService.sites = res;
    })
  }

  loadAllTanks() {
    this.tankService.getAll().subscribe((res) => {
      this.tankService.tanks = res;
    })
  }

  loadAllProducts() {
    this.tankProductService.getAll().subscribe((res) => {
      this.tankProductService.tankProducts = res;
    })
  }

  loadFeedbacks() {
    this.dailyFeedbackService.getAll().subscribe((res) => {
      this.dailyFeedbackService.dailyFeedbacks = res;
      this.dailyFeedbacks = res;
      if(this.dailyFeedbackService.dailyFeedbacks.length > 0) {
        this.choosenDate = this.getMoment(res[this.dailyFeedbackService.dailyFeedbacks.length - 1].date);
        let tablinks, i;
        this.dailyFeedbackService.dailyFeedbacks = this.dailyFeedbacks;
        let times: Iterable<any> | null | undefined = [];

        res.forEach(r => {
          const t = this.getMoment(r.date);
          // @ts-ignore
          times.push(t);
        })
        this.dates = new Set(times);
        console.log(this.dates);
        tablinks = document.getElementsByClassName('page');
        for (i = 0; i < tablinks.length; i++) {
          // @ts-ignore
          if (tablinks[i].textContent.toUpperCase().trim() === this.choosenDate) {
            const dfs = this.dailyFeedbackService.dailyFeedbacks.filter(d => {
              return this.getMoment(d.date) === this.choosenDate;
            });
            this.dailyFeedbackService.dailyFeedbacks = dfs;
          }
        }
        if (tablinks.length > 0)
          tablinks[tablinks.length - 1].className += ' active';

      }
      // this.dates = new Set(times);
    })

  }

  loadNets() {
    this.tankService.getAllNets().subscribe((res) => {
      this.tankService.nets = res;
    })
  }

  goToAdd() {
    this.dailyFeedbackService.dailyFeedback = new DailyFeedback();
    this.siteService.site = new Site();
    this.dailyFeedbackService.tankProduct = new TankProduct();
    this.router.navigate(['daily_feedback'], {replaceUrl: true});
  }

  getTank(fb: DailyFeedback) {
    let res = new Tank();
    for (let tank of this.tankService.tanks) {
      if (tank.id === fb.tankID) {
        res = tank;
      }
    }
    return res;
  }

  getTankProduct(fb: DailyFeedback) {
    let res = new TankProduct();
    for (let product of this.tankProductService.tankProducts) {
      if (product.id === fb.productID) {
        res = product;
      }
    }
    return res;
  }

  getSite(fb: DailyFeedback) {
    let res = new Site();
    for (let tank of this.tankService.tanks) {
      if (tank.id === fb.tankID) {
        for (let site of this.siteService.sites) {
          if (site.id === tank.siteID) {
            res = site;
          }
        }
      }
    }
    return res;
  }

  getNet(fb: DailyFeedback) {
    let res = new Net();
    for (let net of this.tankService.nets) {
      if (net.tankID === fb.tankID) {
        res = net;
      }
    }
    return res;
  }

  getMoment(date: Date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  public changeView(event: Event, date: string) {
    let tablinks, i;
    this.choosenDate = date;
    this.dailyFeedbackService.dailyFeedbacks = this.dailyFeedbacks;
    tablinks = document.getElementsByClassName('page');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // @ts-ignore
    event.currentTarget.className += ' active';
    const dfs = this.dailyFeedbackService.dailyFeedbacks.filter(d => {
      return this.getMoment(d.date) === this.choosenDate;
    });
    console.log(dfs);
    this.dailyFeedbackService.dailyFeedbacks = dfs;
  }

  edit(feedback: DailyFeedback) {
    this.dailyFeedbackService.dailyFeedback = feedback;
    this.router.navigate(['daily_feedback'], {replaceUrl: true});
  }


  onCheckFb(event: any) {
    if (event.target.checked) {
      this.checkedDailyFb.push(event.target.value);
    } else {
      let i: number = 0;
      this.checkedDailyFb.forEach((item) => {
        if (item == event.target.value) {
          this.checkedDailyFb.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.checkedDailyFb);
  }

  public delete() {
    const selectedOrderIds = this.listForm.value.feedbacks;
    console.log(selectedOrderIds);
    // this.loadingObserver = new BehaviorSubject<boolean>(true);
    // let deleted = [];
    // for (let i = this.checkedDailyFb.length - 1; i >= 0; i--) {
    //   deleted.push(this.dailyFeedbackService.dailyFeedbacks[this.checkedDailyFb[i]].id);
    // }
    // this.dailyFeedbackService.delete(deleted).subscribe(async (res) => {
    //   if (res.status === "Success") {
    //     // this.tanks.splice(this.checkedTanks[0], this.checkedTanks.length);
    //     for (let i = this.checkedDailyFb.length - 1; i >= 0; i--)
    //       this.dailyFeedbackService.dailyFeedbacks.splice(this.checkedDailyFb[i], 1);
    //   }
    //   this.loadFeedbacks();
    //   await this.openDialog(res.status, res.message, "determinate");
    // })
    // this.loadingObserver = new BehaviorSubject<boolean>(false);
  }

  isAll: boolean = false;

  onCheckAll($event: Event) {
    let i = 0;
    this.isAll = !this.isAll;
    if (this.checkedDailyFb.length > 0) {
      this.checkedDailyFb = [];
    } else {
      this.checkedDailyFb = [];
      this.dailyFeedbackService.dailyFeedbacks.forEach(d => {
        this.checkedDailyFb.push(i)
        i++;
      });
    }
  }

}
