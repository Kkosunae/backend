import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {UserAuthority} from "./user-authority.entity";

// 230614 임시 테스트 버전. 추후에 회원가입 관련 기획이 구체화되면 변경될 수 있음
// 카카오 로그인에서 제공하는 데이터를 담을 수 있는 데이터를 기본으로 셋팅함
@Entity('user', { schema: 'slider' })
export class User {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'kakao_id', length: 45 })
    kakaoId: string;

    @Column('varchar', { name: 'email', length: 100 })
    email: string;

    @Column('varchar', { name: 'name', nullable: true, length: 45 })
    name: string | null;

    @Column('varchar', { name: 'gender', length: 10 })
    gender: string;

    @Column('varchar', { name: 'phone', length: 20 })
    phone: string;

    @Column('varchar', { name: 'birth', length: 10 })
    birth: string;

    @Column('varchar', { name: 'profile_image', nullable: true, length: 200 })
    profileImage: string | null;

    @Column('timestamp', {
        name: 'created_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date | null;

    @Column('timestamp', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date | null;

    @OneToMany(() => UserAuthority, (userAuthority) => userAuthority.user, {
        eager: true,
    })
    authorities?: any[];
}