import { Component, OnInit } from '@angular/core';
import { EducationalResourcesENComponent } from '../educational-resources-en/educational-resources-en.component';
import { EducationalResourcesESComponent } from '../educational-resources-es/educational-resources-es.component';
import { ExportService } from '../../services/export/export-service';


declare var XLSX: any;

@Component({
    templateUrl: './admin-resources.component.html',
    styleUrls: ['./admin-resources.component.css']
})

export class AdminExternalResourcesComponent implements OnInit {
    ngOnInit(): void {
        this.loadSheetJSScript(() => {
            // throw new Error('Method not implemented.');
          });
    }

    constructor() {

    }
    // exportToExcel(): void {
    //     const data = [
    //       ['Name', 'Open Breastfeeding Tips for New Mothers', 'Open Breastfeeding', 'Bottle Feeding: Infant Formulas'],
    //       ['parent1', '2', '1', '0'],
    //       ['parent1', '1', '1', '2'],
    //       ['parent1', '0', '0', '1'],
    //       ['parent1', '0', '2', '1'],
    //     ];

    //     const workbook = XLSX.utils.book_new();
    //     const worksheet = XLSX.utils.aoa_to_sheet(data);

    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //     XLSX.writeFile(workbook, 'External Resources.xlsx');
    //   }
    //   private loadSheetJSScript(callback: () => void): void {
    //     const script = document.createElement('script');
    //     script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js';
    //     script.onload = callback;
    //     document.head.appendChild(script);
    //   }

  //
  //  This was Kenny's edits that included all of the resources titles from both the Engish and Spanish page
  //  This was commented out just so you can look into it and test it out yourself.
  //

  /*

       exportToExcel(): void {
        // Sample data (replace this with your actual data)
        const dataEnglish = [
          ['Name', 'Date', 'Open Breastfeeding Tips for New Mothers', 'Open Breastfeeding', 'Open Bottle Feeding: Infant Formulas', 'Open What Should My Baby Drink?',
        'Open Raising Adventurous Eaters with First Foods: 1-4 Months Guide', 'Open Raising Adventurous Eaters with First Foods: 4-6 Months Guide',
       'Open Is Your Baby Ready to Start Eating Solid Foods?', 'Open What is a Good First Food For Your Baby?',
        'Open Baby-led Weaning', 'Open No-cook First Foods', 'Open How to Cook Sweetpotato', 'Open How Much Should I Feed My Baby?',
      'Open Peanut Foods for Babies', 'Open Foods to Avoid', 'Open Raising Adventurous Eaters with First Foods: 6-9 Months Guide'],
          ['parent1', '2023-10-16', '2', '1', '0', '1', '1', '2', '1', '1', '1', '0', '0', '0', '1', '0', '0'],
          ['parent1', '2023-10-16', '1', '1', '2', '0', '2', '2', '1', '1', '1', '1', '0', '0', '1', '1', '0'],
          ['parent1', '2023-10-09', '0', '0', '1', '0', '1', '2', '1', '1', '1', '0', '0', '1', '0', '0', '0'],
          ['parent1', '2023-10-07', '0', '2', '1', '0', '1', '1', '2', '1', '2', '0', '0', '0', '1', '0', '1'],
        ];

        const dataSpanish = [
          ['Name', 'Date', 'Open 0 - 6 meses de edad', 'Open 10 consejos lactancia materna', 'Open ¿Qué debería tomar mi bebé?', 'Open Lactancia Mixta',
        'Haciendo de las comidas con su bebe una aventura: Guia de 1 a 4 meses', 'Open Haciendo de las comidas con su bebe una aventura: Guia de 4 a 6 meses',
       'Open 6 - 12 meses de edad', 'Open Alimentación complementaria a los 6 meses',
        'Open Baby-led weaning: Cómo empezar', 'Open Cómo preparar 9 papillas', 'Open Cuánto darle a mi bebé', 'Open Evita estos alimentos',
      'Open Haciendo de las comidas con su bebe una aventura: Guia de 6 a 9 meses', 'Open 10 de los mejores primeros alimentos'],
          ['parent1', '2023-10-16', '2', '1', '0', '1', '1', '2', '1', '1', '1', '0', '0', '0', '1', '0', '0'],
          ['parent1', '2023-10-16', '1', '1', '2', '0', '2', '2', '1', '1', '1', '1', '0', '0', '1', '1', '0'],
          ['parent1', '2023-10-09', '0', '0', '1', '0', '1', '2', '1', '1', '1', '0', '0', '1', '0', '0', '0'],
          ['parent1', '2023-10-07', '0', '2', '1', '0', '1', '1', '2', '1', '2', '0', '0', '0', '1', '0', '1'],
        ];

        // Create a workbook and add a worksheet
        const workbook = XLSX.utils.book_new();
        const worksheetOne = XLSX.utils.aoa_to_sheet(dataEnglish);
        const worksheetTwo = XLSX.utils.aoa_to_sheet(dataSpanish);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheetOne, 'Sheet1');
        XLSX.utils.book_append_sheet(workbook, worksheetTwo, 'Sheet2');

        // Save the workbook to a file
        XLSX.writeFile(workbook, 'External Resources.xlsx');
      }

      private loadSheetJSScript(callback: () => void): void {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js';
        script.onload = callback;
        document.head.appendChild(script);
      }

      */

      exportToExcel(): void {
        // Sample data (replace this with your actual data)
        const dataEnglish = [
          ['Name', 'Date', 'Open Breastfeeding Tips for New Mothers', 'Open Breastfeeding', 'Open Bottle Feeding: Infant Formulas', 'Open What Should My Baby Drink?',
        'Open Raising Adventurous Eaters with First Foods: 1-4 Months Guide', 'Open Raising Adventurous Eaters with First Foods: 4-6 Months Guide',
       'Open Is Your Baby Ready to Start Eating Solid Foods?', 'Open What is a Good First Food For Your Baby?',
        'Open Baby-led Weaning', 'Open No-cook First Foods', 'Open How to Cook Sweetpotato', 'Open How Much Should I Feed My Baby?',
      'Open Peanut Foods for Babies', 'Open Foods to Avoid', 'Open Raising Adventurous Eaters with First Foods: 6-9 Months Guide'],
          ['parent1', '2023-10-16', '2', '1', '0', '1', '1', '2', '1', '1', '1', '0', '0', '0', '1', '0', '0'],
          ['parent1', '2023-10-16', '1', '1', '2', '0', '2', '2', '1', '1', '1', '1', '0', '0', '1', '1', '0'],
          ['parent1', '2023-10-09', '0', '0', '1', '0', '1', '2', '1', '1', '1', '0', '0', '1', '0', '0', '0'],
          ['parent1', '2023-10-07', '0', '2', '1', '0', '1', '1', '2', '1', '2', '0', '0', '0', '1', '0', '1'],
        ];

        const dataSpanish = [
          ['Name', 'Date', 'Open 0 - 6 meses de edad', 'Open 10 consejos lactancia materna', 'Open ¿Qué debería tomar mi bebé?', 'Open Lactancia Mixta',
        'Haciendo de las comidas con su bebe una aventura: Guia de 1 a 4 meses', 'Open Haciendo de las comidas con su bebe una aventura: Guia de 4 a 6 meses',
       , 'Open Alimentación complementaria a los 6 meses',
        'Open Baby-led weaning: Cómo empezar', 'Open Cómo preparar 9 papillas', 'Open Cuánto darle a mi bebé', 'Open Evita estos alimentos',
      'Open Haciendo de las comidas con su bebe una aventura: Guia de 6 a 9 meses', 'Open 10 de los mejores primeros alimentos'],
          ['parent1', '2023-10-16', '1', '1', '2', '0', '2', '2', '1', '1', '1', '1', '0', '0', '1', '1', '0'],
          ['parent1', '2023-10-16', '1', '1', '2', '0', '2', '2', '1', '1', '1', '1', '0', '0', '1', '1', '0'],
          ['parent1', '2023-10-09', '0', '0', '1', '0', '1', '2', '1', '1', '1', '0', '0', '1', '0', '0', '0'],
          ['parent1', '2023-10-07', '0', '2', '1', '0', '1', '1', '2', '1', '2', '0', '0', '0', '1', '0', '1'],
        ];

        // Create a workbook and add a worksheet
        const workbook = XLSX.utils.book_new();
        const worksheetOne = XLSX.utils.aoa_to_sheet(dataEnglish);
        const worksheetTwo = XLSX.utils.aoa_to_sheet(dataSpanish);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheetOne, 'Sheet1');
        XLSX.utils.book_append_sheet(workbook, worksheetTwo, 'Sheet2');

        // Save the workbook to a file
        XLSX.writeFile(workbook, 'External Resources.xlsx');
      }

      private loadSheetJSScript(callback: () => void): void {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js';
        script.onload = callback;
        document.head.appendChild(script);
      }


}
