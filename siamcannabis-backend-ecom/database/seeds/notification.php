<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class notification extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('notification_detail')->insert(
            [
                'id' => 1,
                'type' => 'finance',
                'pattern' => '[{
						    "title": "การชำระเงินเสร็จแล้ว",
						    "data": [
						      {
						        "type": "text",
						        "title": "หมายเลขคำสั่งซื้อ."
						      },
						      {
						        "type": "varible",
						        "title": "invs_ref"
						      },
						      {
						        "type": "text",
						        "title": "เราได้แจ้งผู้ส่งสินค้าเรียบร้อยแล้ว กรุณารอรับสินค้าภายใน"
						      },
						      {
						        "type": "varible",
						        "title": "day"
						      },
						      {
						        "type": "text",
						        "title": "วันทำการค่ะ"
						      }
						    ]
                          }]',
                'url' => '[{
                    "path": "url",
                    "data": ["inv_ref","shop_id"]
                }]',

                'created_at' => date('Y-m-d H:i:s')
            ]
        );

        DB::table('notification')->insert(
            [
                'id' => 1,
                'user_id' => 142,
                'detail_id' => 1,
                'text' => '[{
						    "invs_ref": "454564654655",
						    "day": "5-7"
                          }]',
                'url' => '[{
                    "path": "product-payment-repurchase",
                    "data": ["20201027135123666955104","16"]
                }]',
                'created_at' => date('Y-m-d H:i:s')
            ]
        );
    }
}
