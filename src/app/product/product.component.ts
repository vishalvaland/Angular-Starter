import { first } from 'rxjs/operators';
import { ProductService } from './../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  productForm:FormGroup;
  submitted=false;
  alertSwitch = false;
  alertMessage :any;
  alertClass :string;
  preview: string;

  constructor(

    private formBuilder:FormBuilder,
    private productService:ProductService

  ) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      name:['', Validators.required],
      code:['', Validators.required],
      description:[''],
      image:[null],
      price:['',Validators.required],
      category:['', Validators.required]

    });
  }

  get f() { return this.productForm.controls; }
      // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({
      image: file
    });
    this.productForm.get('image').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
    }


    onsubmit() { 

      // let image = new FormData();
      // image.append('image', this.productForm.value.image); 
      // return image;
      // console.log(image);


      console.log(this.productForm);
      this.submitted=true;
      if(this.productForm.invalid){
        return true;
      }
      
      this.productService.create(
        this.productForm.value.name, 
        this.productForm.value.code, 
        this.productForm.value.description, 
        this.productForm.value.image, 
        this.productForm.value.price,
        this.productForm.value.category
        )
      .pipe(first())
      .subscribe(data => { 
        this.alertSwitch=true;
        this.alertClass='success';
        this.alertMessage='Registration successful'; 
      },
      error => {
        this.alertSwitch=true;
        this.alertClass='danger';
         this.alertMessage=error.error;  
      } 
      );
      

    }

 
   

}
