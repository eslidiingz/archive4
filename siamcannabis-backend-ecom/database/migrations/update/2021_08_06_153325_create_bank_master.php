<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateBankMaster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_master', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo');
            $table->timestamps();
        });

        $data = array(
            'ธนาคารกสิกรไทย' => 'kbank.svg',
            'ธนาคารไทยพาณิชย์' => 'scb.svg',
            'ธนาคารกรุงเทพ' => 'bbl.svg',
            'ธนาคารกรุงไทย' => 'ktb.svg',
            'ธนาคารทหารไทย' => 'tmb.svg',
            'ธนาคารกรุงศรีอยุธยา' => 'bay.svg',
            'ธนาคารเกียรตินาคิน' => 'kk.svg',
            'ธนาคารซีไอเอ็มบีไทย' => 'cimb.svg',
            'ธนาคารทิสโก้' => 'tisco.svg',
            'ธนาคารธนชาต' => 'tbank.svg',
            'ธนาคารยูโอบี' => 'uob.svg',
            'ธนาคารไทยเครดิตเพื่อรายย่อย' => 'tcrb.svg',
            'ธนาคารแลนด์แอนด์ เฮ้าส์' => 'lhb.svg',
            'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร' => 'baac.svg',
            'ธนาคารออมสิน' => 'gsb.svg',
            'ธนาคารอาคารสงเคราะห์' => 'ghb.svg',
            'ธนาคารอิสลามแห่งประเทศไทย' => 'ibank.svg'
        );
        foreach($data as $key => $value ){
            DB::table('bank_master')->insert(
                array(
                    'name' => $key,
                    'logo' => $value
                )
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bank_master');
    }
}
