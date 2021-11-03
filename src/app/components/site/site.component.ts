import {Component, OnInit, VERSION} from '@angular/core';
import {SiteService} from "../../services/site.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Site} from "../../models/Site";
import {TankService} from "../../services/tank.service";
import {Tank} from "../../models/Tank";
import {Net} from "../../models/Net";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  pageForm: FormGroup;
  tankForm: FormGroup = new FormGroup({});
  siteForm: FormGroup = new FormGroup({});
  netForm: FormGroup = new FormGroup({});
  ngVersion: string = VERSION.full;
  breakpoint!: number;
  siteFormSubmitted = false;
  tankFormSubmitted = false;
  netFormSubmitted = false;
  displayedColumns: string[] = ['check', 'name', 'Edit'];
  hideRequiredControl = new FormControl(false);
  public choosenSite!: Site;
  public choosenTank!: Tank;
  public choosenNet!: Net;
  public tanks!: Tank[];
  public nets!: Net[];
  private checkedSites: number[] = [];
  private checkedTanks: number[] = [];
  private checkedNets: number[] = [];
  loadingObserver!: BehaviorSubject<boolean>;

  constructor(public siteService: SiteService, public formBuilder: FormBuilder, public tankService: TankService, public dialog: MatDialog) {
    this.choosenSite = new Site();
    this.choosenTank = new Tank();
    this.tanks = [];
    this.nets = [];

    // @ts-ignore
    this.pageForm = new FormGroup({

      siteForm: this.formBuilder.group({
        name: new FormControl('', Validators.required)
      }),

      tankForm: this.formBuilder.group({
        tank_name: new FormControl('', Validators.required)
      }),

      netForm: this.formBuilder.group({
        net_number: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
      })
    })
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.loadAllSites();
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
    })
  }

  loadTanks() {
    if (this.choosenSite.id) {
      this.tankService.getBySite(this.choosenSite.id).subscribe((res) => {
        this.tanks = res;
      })
    }
  }

  async addSite(siteForm: any) {
    this.siteFormSubmitted = true;
    console.log(siteForm.value.name);
    this.siteForm = siteForm;
    if (siteForm.valid) {
      this.siteService.site.name = siteForm.value.name;
      this.loadingObserver = new BehaviorSubject<boolean>(true);
      await this.openDialog("", "", "indeterminate");
      if (!this.siteService.site.id) {
        this.siteService.create().subscribe(async (res) => {
          if (res.status === "Success") {
            this.siteService.sites.push(res.site);
            this.siteService.site.name = "";
            // @ts-ignore
            this.siteForm.get('name').setValue('');
          }
          this.closeDialog();
          await this.openDialog(res.status, res.message, "indeterminate");
          this.siteFormSubmitted = false;
        })
        this.loadingObserver = new BehaviorSubject<boolean>(false);
      } else {
        this.siteService.update(this.siteService.site.id).subscribe(async (res) => {

          if (res.status === "Success") {
            for (let i = 0; i < this.siteService.sites.length; i++) {
              if (this.siteService.sites[i].id === res.site.id) {
                this.siteService.sites[i] = res.site;
              }
            }
          }
          this.closeDialog();
          await this.openDialog(res.status, res.message, "indeterminate");
          this.siteFormSubmitted = false;
        })
        this.loadingObserver = new BehaviorSubject<boolean>(false);
      }
    }
  }

  async addTank(tankForm: any) {
    this.tankFormSubmitted = true;
    this.tankForm = tankForm;
    if (tankForm.valid && this.choosenSite.id) {
      this.loadingObserver = new BehaviorSubject<boolean>(true);
      await this.openDialog("", "", "indeterminate");
      if (!this.tankService.tank.id) {
        this.tankService.tank.siteID = this.choosenSite.id;
        this.tankService.tank.name = tankForm.value.tank_name;
        this.tankService.create().subscribe(async (res) => {
          if (res.status === "Success") {
            this.tanks.push(res.tank);
          }
          this.closeDialog();
          await this.openDialog(res.status, res.message, "indeterminate");
          this.tankFormSubmitted = false;
        })
        this.loadingObserver = new BehaviorSubject<boolean>(false);
      } else {
        this.tankService.tank.name = tankForm.value.tank_name;
        this.tankService.update(this.tankService.tank.id).subscribe(async (res) => {
          if (res.status === "Success") {
            for (let i = 0; i < this.tanks.length; i++) {
              if (this.tanks[i].id === res.tank.id) {
                this.tanks[i] = res.tank;
              }
            }
          }
          this.closeDialog();
          await this.openDialog(res.status, res.message, "indeterminate");
          this.tankFormSubmitted = false;
        })
        this.loadingObserver = new BehaviorSubject<boolean>(false);
      }
    }
  }

  editSite(site: Site) {
    this.siteService.site = site;
  }

  public async deleteSite() {
    this.loadingObserver = new BehaviorSubject<boolean>(true);
    let deleted = [];
    let status = "";
    let message = "";
    for (let i = this.checkedSites.length - 1; i >= 0; i--) {
      deleted.push(this.siteService.sites[this.checkedSites[i]].id);
    }
    await this.openDialog(status, message, "indeterminate");

    this.siteService.delete(deleted).subscribe(async (res) => {
      if (res.status === "Success") {
        for (let i = this.checkedSites.length - 1; i >= 0; i--)
          this.siteService.sites.splice(this.checkedSites[i], 1);
      }
      status = res.status;
      message = res.message;
      this.loadingObserver = new BehaviorSubject<boolean>(false);
      this.closeDialog();
      await this.openDialog(status, message, "determinate");
    })
  }

  editTank(tank: Tank) {
    this.tankService.tank = tank;
  }

  public deleteTank() {
    this.loadingObserver = new BehaviorSubject<boolean>(true);
    let deleted = [];
    for (let i = this.checkedTanks.length - 1; i >= 0; i--) {
      deleted.push(this.tanks[this.checkedTanks[i]].id);
    }
    this.tankService.delete(deleted).subscribe(async (res) => {
      if (res.status === "Success") {
        // this.tanks.splice(this.checkedTanks[0], this.checkedTanks.length);
        for (let i = this.checkedTanks.length - 1; i >= 0; i--)
          this.tanks.splice(this.checkedTanks[i], 1);
      }
      await this.openDialog(res.status, res.message, "determinate");
    })
    this.loadingObserver = new BehaviorSubject<boolean>(false);

  }

  onCheckSite(event: any) {
    if (event.target.checked) {
      this.checkedSites.push(event.target.value)
    } else {
      let i: number = 0;
      this.checkedSites.forEach((item) => {
        if (item == event.target.value) {
          this.checkedSites.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.checkedSites);
  }

  onCheckTank(event: any) {
    if (event.target.checked) {
      this.checkedTanks.push(event.target.value)
    } else {
      let i: number = 0;
      this.checkedTanks.forEach((item) => {
        if (item == event.target.value) {
          this.checkedTanks.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.checkedTanks);
  }

  loadNets() {
    this.tankService.getByNetByTankID(this.choosenTank.id).subscribe((res) => {
      this.nets = res;
    })
  }

  editNet(net: Net) {
    this.tankService.net = net;
  }

  public deleteNet() {
    this.loadingObserver = new BehaviorSubject<boolean>(true);
    let deleted = [];
    for (let i = this.checkedNets.length - 1; i >= 0; i--) {
      deleted.push(this.nets[this.checkedNets[i]].numNet);
    }
    this.tankService.deleteNet(deleted).subscribe(async (res) => {
      if (res.status === "Success") {
        for (let i = this.checkedNets.length - 1; i >= 0; i--)
          this.nets.splice(this.checkedNets[i], 1);
      }
      await this.openDialog(res.status, res.message, "determinate");
    })
    this.loadingObserver = new BehaviorSubject<boolean>(false);
  }

  onCheckNet(event: any) {
    if (event.target.checked) {
      this.checkedNets.push(event.target.value)
    } else {
      let i: number = 0;
      this.checkedNets.forEach((item) => {
        if (item == event.target.value) {
          this.checkedNets.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.checkedNets);
  }

  addNet(netForm: any) {

    this.netFormSubmitted = true;
    let nets_num: number[] = [];
    this.nets.forEach(net => {
      nets_num.push(net.numNet);
    })
    this.netForm = netForm;

    if (netForm.valid && this.choosenTank.id) {
      this.tankService.net.numNet = netForm.value.net_number;
      if (!nets_num.includes(this.tankService.net.numNet)) {
        this.loadingObserver = new BehaviorSubject<boolean>(true);
        this.tankService.net.tankID = this.choosenTank.id;
        this.tankService.createNet().subscribe(async (res) => {
          if (res.status === "Success") {
            this.nets.push(res.net);
          }
          await this.openDialog(res.status, res.message, "indeterminate");
          this.netFormSubmitted = false;
        })
        this.loadingObserver = new BehaviorSubject<boolean>(false);
      }
    }
  }
}
