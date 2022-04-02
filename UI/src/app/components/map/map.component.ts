import { Component, OnInit } from '@angular/core';
import { AddressInfo } from 'src/app/common/address-data';
import { CityEnum } from 'src/app/enums/city-enum';
import { AddressDataHelper } from 'src/app/helpers/address-data-helper';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  test3: AddressInfo[] = [];

  constructor (private readonly dbService: FirebaseDbService) { }

  async ngOnInit(): Promise<void> {
    const addressData = await this.dbService.getAddressDataAsync(CityEnum.Tampa);
    console.log(AddressDataHelper.getAddressInfoArray(addressData));
  }
}
